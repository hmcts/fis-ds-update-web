import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';
import { COOKIES_PAGE } from '../urls';

import { generateContent } from './content';

export const TOGGLE_SWITCH = { ON: 'on', OFF: 'off' };

@autobind
export class CookiesGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    let cookiePreferences = {
      analytics: TOGGLE_SWITCH.OFF,
      apm: TOGGLE_SWITCH.OFF,
    };
    if (typeof req.cookies.hasOwnProperty !== 'function') {
      const cookieValue = JSON.stringify(cookiePreferences);
      let cookieExpiryDuration = Number(config.get('cookies.expiryTime'));
      const TimeInADay = 24 * 60 * 60 * 1000;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cookieExpiryDuration = cookieExpiryDuration * TimeInADay; //cookie time in milliseconds
      res.cookie(config.get('cookies.cookieName'), cookieValue, {
        maxAge: cookieExpiryDuration,
        httpOnly: false,
        encode: String,
      });
      return res.redirect(COOKIES_PAGE);
    } else {
      if (req.cookies.hasOwnProperty(config.get('cookies.cookieName'))) {
        cookiePreferences = JSON.parse(req.cookies[config.get('cookies.cookieName') as string]);
      }
      let additionalRenderable = { cookiePrefrences: cookiePreferences };
      const cookieWithSaveQuery = COOKIES_PAGE + '?togglesaveCookie=true';
      const checkforCookieUrlAndQuery = req.url === cookieWithSaveQuery;
      if (checkforCookieUrlAndQuery) {
        additionalRenderable = Object.assign(additionalRenderable, {
          cookieMessage: true,
          cookiePrefrences: cookiePreferences,
        });
      }

      this.cookiePreferenceChanger(req, res);
      super.get(req, res, additionalRenderable);
    }
  }

  public cookiePreferenceChanger(req: AppRequest, res: Response): void {
    if (req.query.hasOwnProperty('analytics') && req.query.hasOwnProperty('apm')) {
      let cookieExpiryDuration = Number(config.get('cookies.expiryTime'));
      const TimeInADay = 24 * 60 * 60 * 1000;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cookieExpiryDuration = cookieExpiryDuration * TimeInADay; //cookie time in milliseconds
      const CookiePreferences = {
        analytics: '',
        apm: '',
      };
      if (req.query.hasOwnProperty('analytics')) {
        switch (req.query['analytics']) {
          case TOGGLE_SWITCH.OFF:
            CookiePreferences['analytics'] = TOGGLE_SWITCH.OFF;
            break;
          case TOGGLE_SWITCH.ON:
            CookiePreferences['analytics'] = TOGGLE_SWITCH.ON;
            break;
          default:
            CookiePreferences['analytics'] = TOGGLE_SWITCH.OFF;
        }
      }
      if (req.query.hasOwnProperty('apm')) {
        switch (req.query['apm']) {
          case TOGGLE_SWITCH.OFF:
            CookiePreferences['apm'] = TOGGLE_SWITCH.OFF;
            break;
          case TOGGLE_SWITCH.ON:
            CookiePreferences['apm'] = TOGGLE_SWITCH.ON;
            break;
          default:
            CookiePreferences['apm'] = TOGGLE_SWITCH.OFF;
        }
      }
      const cookieValue = JSON.stringify(CookiePreferences);
      res.cookie(config.get('cookies.cookieName'), cookieValue, {
        maxAge: cookieExpiryDuration,
        httpOnly: false,
        encode: String,
      });
      const RedirectURL = COOKIES_PAGE + '?togglesaveCookie=true';
      res.redirect(RedirectURL);
    }
  }
}
