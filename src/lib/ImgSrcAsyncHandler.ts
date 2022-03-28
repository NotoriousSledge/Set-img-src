import {EventProperty} from '../models';
import * as functions from './asyncFunctions';
export default class ImgSrcAsyncHandler {
  public static setSrcById(id: string,
      value: string, eventProperties?: EventProperty[]): Promise<void> {
    return functions.setSrcByIdAsync(id, value, eventProperties);
  }

  public static removeSrcById(id: string,
      eventProperties?: EventProperty[]): Promise<void> {
    return functions.removeSrcByIdAsync(id, eventProperties);
  }


  public static setSrcByElement(image: HTMLImageElement,
      value: string, eventProperties?: EventProperty[] ): Promise<void> {
    return functions.setSrcByElementAsync(image, value, eventProperties);
  }

  public static removeSrcByElement(image: HTMLImageElement,
      eventProperties?: EventProperty[]): Promise<void> {
    return functions.removeSrcByElementAsync(image, eventProperties);
  }
}


