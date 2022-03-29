import {setSrcByElementAsync, setSrcByIdAsync,
  removeSrcByElementAsync, removeSrcByIdAsync, EventProperty} from './../';
export default class ImgSrcAsyncHandler {
  public static setSrcById(id: string,
      value: string, eventProperties?: EventProperty[]): Promise<void> {
    return setSrcByIdAsync(id, value, eventProperties);
  }

  public static removeSrcById(id: string,
      eventProperties?: EventProperty[]): Promise<void> {
    return removeSrcByIdAsync(id, eventProperties);
  }


  public static setSrcByElement(image: HTMLImageElement,
      value: string, eventProperties?: EventProperty[] ): Promise<void> {
    return setSrcByElementAsync(image, value, eventProperties);
  }

  public static removeSrcByElement(image: HTMLImageElement,
      eventProperties?: EventProperty[]): Promise<void> {
    return removeSrcByElementAsync(image, eventProperties);
  }
}


