import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  enableFor(server: Application): void {
    if (server.locals.ENV !== 'development') {
      propertiesVolume.addTo(config);

      this.setSecret('secrets.sptribs.app-insights-instrumentation-key', 'appInsights.instrumentationKey');
      this.setSecret('secrets.sptribs.redis-access-key', 'session.redis.key');
      this.setSecret('secrets.sptribs.redis-access-key', 'session.secret');
      this.setSecret('secrets.sptribs.idam-systemupdate-username', 'services.idam.systemUsername');
      this.setSecret('secrets.sptribs.idam-systemupdate-password', 'services.idam.systemPassword');
      this.setSecret('secrets.sptribs.idam-secret', 'services.idam.clientSecret');
    }
  }

  private setSecret(fromPath: string, toPath: string): void {
    if (config.has(fromPath)) {
      set(config, toPath, get(config, fromPath));
    }
  }
}
