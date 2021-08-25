import Application from 'tes-masuk-atomic/app';
import config from 'tes-masuk-atomic/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
