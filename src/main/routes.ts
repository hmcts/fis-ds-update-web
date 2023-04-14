import fs from 'fs';

import { Application, RequestHandler } from 'express';

import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { stepsWithContent } from './steps';
import { AccessibilityStatementGetController } from './steps/accessibility-statement/get';
import { CookiesGetController } from './steps/cookies/get';
import { ErrorController } from './steps/error/error.controller';
import { HomeGetController } from './steps/home/get';
import { PrivacyPolicyGetController } from './steps/privacy-policy/get';
import { TermsAndConditionsGetController } from './steps/terms-and-conditions/get';
import { ACCESSIBILITY_STATEMENT, COOKIES_PAGE, HOME_URL, PRIVACY_POLICY, TERMS_AND_CONDITIONS } from './steps/urls';

export class Routes {
  /**
   *
   * @param app
   */
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(HOME_URL, errorHandler(new HomeGetController().get));
    app.get(COOKIES_PAGE, errorHandler(new CookiesGetController().get));
    app.get(PRIVACY_POLICY, errorHandler(new PrivacyPolicyGetController().get));
    app.get(TERMS_AND_CONDITIONS, errorHandler(new TermsAndConditionsGetController().get));
    app.get(ACCESSIBILITY_STATEMENT, errorHandler(new AccessibilityStatementGetController().get));

    for (const step of stepsWithContent) {
      const files = fs.readdirSync(`${step.stepDir}`);

      const getControllerFileName = files.find(item => /get/i.test(item) && !/test/i.test(item));
      const getController = getControllerFileName
        ? require(`${step.stepDir}/${getControllerFileName}`).default
        : GetController;

      app.get(step.url, errorHandler(new getController(step.view, step.generateContent).get));

      if (step.form) {
        const postControllerFileName = files.find(item => /post/i.test(item) && !/test/i.test(item));
        const postController = postControllerFileName
          ? require(`${step.stepDir}/${postControllerFileName}`).default
          : PostController;
        app.post(step.url, errorHandler(new postController(step.form.fields).post));
      }
    }

    /**
     * @POST_ROUTES
     */

    app.use(errorController.notFound as unknown as RequestHandler);
  }
}
