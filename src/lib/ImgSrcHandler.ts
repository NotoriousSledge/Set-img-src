import {EventProperty} from '../models';
import * as functions from './functions';
export default class ImgSrcHandler {
  public static setSrcById(id: string,
      value: string, eventProperties?: EventProperty[]) {
    functions.setSrcById(id, value, eventProperties);
  }

  public static removeSrcById(id: string, eventProperties?: EventProperty[]) {
    functions.removeSrcById(id, eventProperties);
  }


  public static setSrcByElement(image: HTMLImageElement,
      value: string, eventProperties?: EventProperty[] ) {
    functions.setSrcByElement(image, value, eventProperties);
  }

  public static removeSrcByElement(image: HTMLImageElement,
      eventProperties?: EventProperty[]) {
    functions.removeSrcByElement(image, eventProperties);
  }
}
