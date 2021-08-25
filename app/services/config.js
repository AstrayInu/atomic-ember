import Service from '@ember/service';
import ENV from '../config/environment';

export default class ConfigService extends Service {
  appenv = ENV.APP
}
