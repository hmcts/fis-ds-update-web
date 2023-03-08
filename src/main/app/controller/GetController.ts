/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import Negotiator from 'negotiator';

import { LanguageToggle } from '../../modules/i18n';
import { CommonContent, Language, generatePageContent } from '../../steps/common/common.content';
import * as Urls from '../../steps/urls';
import { DATA_VERIFICATION, UPLOAD_DOCUMENT } from '../../steps/urls';

import { AppRequest } from './AppRequest';

const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('server');

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;

@autobind
export class GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async get(req: AppRequest, res: Response, renderableContents?): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      // If there's an async error, it will have already rendered an error page upstream,
      // so we don't want to call render again
      return;
    }

    if (req.query.hasOwnProperty('logged-in')) {
      req.session.loggedInSystemUserType = req.query['logged-in'] as string;
      return res.redirect(Urls.START_HOME);
    } else {
      try {
        const name = this.getName(req) as string;
        const language = this.getPreferredLanguage(req) as Language;
        const captionValue = this.getCaption(req) as string;
        const document_type = this.getDocumentType(req) as string;
        const byApplicant = req.query['byApplicant'] as string;
        const addresses = req.session?.addresses;
        const content = generatePageContent({
          language,
          pageContent: this.content,
          userCase: req.session?.userCase,
          userEmail: req.session?.user?.email,
          caption: captionValue,
          document_type,
          userCaseList: req.session?.userCaseList,
          addresses,
          name,
          userIdamId: req.session?.user?.id,
          byApplicant,
          additionalData: {
            req,
          },
        });

        if (req.originalUrl === UPLOAD_DOCUMENT || req.originalUrl === DATA_VERIFICATION) {
          logger.info(`${req.originalUrl} is being called`);
        } else {
          req.session['isDataVerified'] = false;
          req.session['tempValidationData'] = undefined;
        }

        /**
         * Handled scenario where caption is not present as query param
         */
        const viewData = {
          ...content,
          ...renderableContents,
          sessionError: req.session.hasOwnProperty('errors') ? req.session.errors : [],
          caseId: req.session['caseRefId'],
        };

        if (req.session?.errors) {
          req.session.errors = undefined;
        }
        //Add caption only if it exists else it will be rendered by specific page
        if (captionValue) {
          Object.assign(viewData, { caption: captionValue });
        }
        res.render(this.view, viewData);
      } catch (error) {
        res.redirect('/error');
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected getPreferredLanguage(req: AppRequest) {
    // User selected language
    const requestedLanguage = req.query['lng'] as string;
    if (LanguageToggle.supportedLanguages.includes(requestedLanguage)) {
      return requestedLanguage;
    }

    // Saved session language
    if (req.session?.lang) {
      return req.session.lang;
    }

    // Browsers default language
    const negotiator = new Negotiator(req);
    return negotiator.language(LanguageToggle.supportedLanguages) || 'en';
  }

  private getCaption(req: AppRequest) {
    const caption = req.query['caption'] as string;
    return caption;
  }
  private getDocumentType(req: AppRequest) {
    const caption = req.query['document_type'] as string;
    return caption;
  }

  public parseAndSetReturnUrl(req: AppRequest): void {
    if (req.query.returnUrl) {
      if (Object.values(Urls).find(item => item === `${req.query.returnUrl}`)) {
        req.session.returnUrl = `${req.query.returnUrl}`;
      }
    }
  }

  //eslint-disable-next-line @typescript-eslint/ban-types
  public saveSessionAndRedirect(req: AppRequest, res: Response, callback?: Function): void {
    req.session.save(err => {
      if (err) {
        throw err;
      }
      if (callback) {
        callback();
      } else {
        res.redirect(req.url);
      }
    });
  }

  private getName(req: AppRequest) {
    const caption = req.query['name'] as string;
    return caption;
  }
}
