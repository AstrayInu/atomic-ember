import Model, { attr } from '@ember-data/model'
import { identity } from 'underscore'

export default class DompetModel extends Model {
  @attr id;
  @attr nama;
  @attr ref;
  @attr desc;
  @attr status;
  
  
}