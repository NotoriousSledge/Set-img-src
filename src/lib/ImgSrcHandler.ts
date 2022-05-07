import {setSrcByElement, setSrcById,
  removeSrcByElement, removeSrcById,
  EventProperty} from './../';

/**
   * A handler class for manipulation of a HTMLImageElement's src-attribute
   * Contains static-functions for setting and removing srcs.
   * @class ImgSrcHandler
   */
export default class ImgSrcHandler {
  /**
 * Sets the src of an image element by id.
 * @param {string} id  The id of the element to set the src to.
 * @param {string} value The value to set the src to.
 * @param {EventProperty[]} eventProperties The events to keep on the element.
 * @return {void}
 */
  public static setSrcById(id: string,
      value: string, eventProperties?: EventProperty[]): void {
    try {
      setSrcById(id, value, eventProperties);
    } catch (err) {
      throw (err);
    }
  }


  /**
 * Removes the src of an image element by id.
 * @param {string} id The id of the element to remove the src from.
 * @param {EventProperty[]} eventProperties The events to keep on the element.
 * @return {void}
 */
  public static removeSrcById(id: string,
      eventProperties?: EventProperty[]): void {
    try {
      removeSrcById(id, eventProperties);
    } catch (err) {
      throw err;
    }
  }

  /**
 * Sets the src of an image element.
 * @param {HTMLImageElement} image The image element to set the src to.
 * @param {string} value The value to set the src to.
 * @param {EventProperty[]} eventProperties The events to keep on the element.
 * @return {void}
 */
  public static setSrcByElement(image: HTMLImageElement,
      value: string, eventProperties?: EventProperty[] ): void {
    try {
      setSrcByElement(image, value, eventProperties);
    } catch (err) {
      throw (err);
    }
  }

  /**
 * Removes the src of an image element.
 * @param {HTMLImageElement} image The image element to remove the src from.
 * @param {EventProperty[]} eventProperties The events to keep on the element.
 * @return {void}
 */
  public static removeSrcByElement(image: HTMLImageElement,
      eventProperties?: EventProperty[]): void {
    try {
      removeSrcByElement(image, eventProperties);
    } catch (err) {
      throw (err);
    }
  }
}
