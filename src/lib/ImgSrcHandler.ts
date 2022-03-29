import {setSrcByElement, setSrcById,
  removeSrcByElement, removeSrcById,
  EventProperty} from './../';
export default class ImgSrcHandler {
  public static setSrcById(id: string,
      value: string, eventProperties?: EventProperty[]) {
    try {
      setSrcById(id, value, eventProperties);
    } catch (err) {
      throw (err);
    }
  }

  public static removeSrcById(id: string, eventProperties?: EventProperty[]) {
    try {
      removeSrcById(id, eventProperties);
    } catch (err) {
      throw err;
    }
  }


  public static setSrcByElement(image: HTMLImageElement,
      value: string, eventProperties?: EventProperty[] ) {
    try {
      setSrcByElement(image, value, eventProperties);
    } catch (err) {
      throw (err);
    }
  }

  public static removeSrcByElement(image: HTMLImageElement,
      eventProperties?: EventProperty[]) {
    try {
      removeSrcByElement(image, eventProperties);
    } catch (err) {
      throw (err);
    }
  }
}
