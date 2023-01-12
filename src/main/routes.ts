import fs from 'fs';

import { Application, RequestHandler } from 'express';

import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { stepsWithContent } from './steps';
import { ErrorController } from './steps/error/error.controller';
import { HomeGetController } from './steps/home/get';
import { COOKIES_PAGE, HOME_URL } from './steps/urls';
import { CookiesGetController } from './steps/cookies/get';

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
