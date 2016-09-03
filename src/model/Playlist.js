import {BaseModel} from '../base/BaseModel';
import {HttpClient} from 'aurelia-http-client';
import ENV from '../environment';

export class Playlist extends BaseModel {
  path = '/playlist';
}
