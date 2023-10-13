import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  enableFor(server: Application): void {
    console.log('server.locals.ENV');
    console.log(server.locals.ENV);
    propertiesVolume.addTo(config);

    this.setSecret('secrets.fis-kv.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
    this.setSecret('secrets.fis-kv.redis-access-key-v6', 'session.redis.key');
    this.setSecret('secrets.fis-kv.redis-access-key-v6', 'session.secret');
  }

  private setSecret(fromPath: string, toPath: string): void {
    if (config.has(fromPath)) {
      set(config, toPath, get(config, fromPath));
    }
  }
}
