import {setSrcByElementAsync, setSrcByIdAsync,
  removeSrcByElementAsync, removeSrcByIdAsync, EventProperty} from './../';

/**
  * A handler class for async manipulation of a HTMLImageElement's src-attribute
  * Contains static methods for setting and removing srcs with promises.
  * @class ImgSrcAsyncHandler
*/
export default class ImgSrcAsyncHandler {
/**
  * Sets the src of an image element by Id.
  * @param {string} id The id of the element to set the src to.
  * @param {string} value The value to set the src to.
  * @param {EventProperty[]} eventProperties The events to keep on the element.
  * @return {Promise<void>} A promise that resolves when the src is set.
  */
  public static setSrcById(id: string,
      value: string, eventProperties?: EventProperty[]): Promise<void> {
    return setSrcByIdAsync(id, value, eventProperties);
  }
  /**
  * Removes the src of an image element by Id.
  * @param {string} id The id of the element to remove the src from.
  * @param {EventProperty[]} eventProperties The events to keep on the element.
  * @return {Promise<void>} A promise that resolves when the src is removed.
 */
  public static removeSrcById(id: string,
      eventProperties?: EventProperty[]): Promise<void> {
    return removeSrcByIdAsync(id, eventProperties);
  }

  /**
 * Sets the src of an image element.
 * @param {HTMLImageElement} image The image element to set the src to.
 * @param {string} value The value to set the src to.
 * @param {EventProperty[]} eventProperties The events to keep on the element.
 * @return {Promise<void>} A promise that resolves when the src is set.
 */
  public static setSrcByElement(image: HTMLImageElement,
      value: string, eventProperties?: EventProperty[] ): Promise<void> {
    return setSrcByElementAsync(image, value, eventProperties);
  }

  /**
  * Removes the src of an image element.
  * @param {HTMLImageElement} image The image element to to remove the src from.
  * @param {EventProperty[]} eventProperties The events to keep on the element.
  * @return {Promise<void>} A promise that resolves when the src is removed.
 */
  public static removeSrcByElement(image: HTMLImageElement,
      eventProperties?: EventProperty[]): Promise<void> {
    return removeSrcByElementAsync(image, eventProperties);
  }
}


