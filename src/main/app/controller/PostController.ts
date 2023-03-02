// eslint-disable-next-line import/no-unresolved
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { CASE_SEARCH_URL } from '../../steps/urls';
import { Case } from '../case/case';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

import { AppRequest } from './AppRequest';

@autobind
export class PostController<T extends AnyObject> {
  //protected ALLOWED_RETURN_URLS: string[] = [CHECK_ANSWERS_URL];
  constructor(protected readonly fields: FormFields | FormFieldsFn) {}
  /**
   * Parse the form body and decide whether this is a save and sign out, save and continue or session time out
   */
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);

    req.session['dssCaseUpdatedBy'] = req.query['dssCaseUpdatedBy'] as string;

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    await this.saveAndContinue(req, res, form, formData);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async saveAndContinue(req: AppRequest<T>, res: Response, form: Form, formData: Partial<Case>): Promise<void> {
    this.redirect(req, res);
  }

  protected redirect(req: AppRequest<T>, res: Response, nextUrl?: string): void {
    let target;
    if (req.body['saveAsDraft']) {
      //redirects to task-list page in case of save-as-draft button click
      req.session.returnUrl = undefined;
      target = CASE_SEARCH_URL;
    } else if (req.session?.errors?.length) {
      //redirects to same page in case of validation errors
      target = req.url;
    } else {
      //redirects to input nextUrl if present otherwise calls getNextStepUrl to get the next step url
      target = nextUrl || getNextStepUrl(req, req.session.userCase);
    }

    req.session?.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(target);
    });
  }
}

export type AnyObject = Record<string, unknown>;
