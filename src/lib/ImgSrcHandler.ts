import {EventProperty} from '../models';
import * as functions from './functions';
export default class ImgSrcHandler {
  public static setSrcById(id: string,
      value: string, eventProperties?: EventProperty[]) {
    try {
      functions.setSrcById(id, value, eventProperties);
    } catch (err) {
      throw (err);
    }
  }

  public static removeSrcById(id: string, eventProperties?: EventProperty[]) {
    try {
      functions.removeSrcById(id, eventProperties);
    } catch (err) {
      throw err;
    }
  }


  public static setSrcByElement(image: HTMLImageElement,
      value: string, eventProperties?: EventProperty[] ) {
    try {
      functions.setSrcByElement(image, value, eventProperties);
    } catch (err) {
      throw (err);
    }
  }

  public static removeSrcByElement(image: HTMLImageElement,
      eventProperties?: EventProperty[]) {
    try {
      functions.removeSrcByElement(image, eventProperties);
    } catch (err) {
      throw (err);
    }
  }
}
