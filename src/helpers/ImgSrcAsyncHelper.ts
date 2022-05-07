import {EventProperty} from '../models';
/**
 * A helper class for setting the src of an image element.
 * Contains the implementation logic for the async setSrc-methods.
 * @class ImgSrcAsyncHelper
 */
export class ImgSrcAsyncHelper {
  /**
   * Gets the element containing the id and then calls the srcByElement-method.
   * @param {string} id The id of the element to set the src to.
   * @param {string} dataUrl The value to set the src to.
   * @param {EventProperty[]} eventProperties The events to keep on the element.
   * @return {Promise<void>} A promise that resolves when the src is set.
   */
  public static setSrcById(id: string,
      dataUrl: string, eventProperties?: EventProperty[]): Promise<void> {
    return new Promise((async (resolve, reject) => {
      const image = document.getElementById(id) as HTMLImageElement;
      await this.setSrcByElement(image, dataUrl, eventProperties);
      return resolve();
    }));
  }

  /**
   * Sets the src of an image element.
   * The actual implementation of the method.
   * Bypasses the problem by cloning and replacing.
   * Instead of setting the src directly.
   * @param {HTMLImageElement} image The image element to set the src to.
   * @param {string} dataUrl The value to set the src to.
   * @param {EventProperty[]} eventProperties The events to keep on the element.
   * @return {Promise<void>} A promise that resolves when the src is set.
   */
  public static setSrcByElement(image: HTMLImageElement,
      dataUrl: string, eventProperties?: EventProperty[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const clone = image.cloneNode(true) as HTMLImageElement;
      clone.src = dataUrl;

      eventProperties?.forEach((prop) => {
        if (prop.Options) {
          clone.addEventListener(prop.Event, prop.Listener, prop.Options);
        } else {
          clone.addEventListener(prop.Event, prop.Listener);
        }
      });

      image.parentNode?.replaceChild(clone, image);
      return resolve();
    });
  }

  /**
   * Validates the input for the async SrcById-methods.
   * @param {string} id The id of the element to set the src to.
   * @param {string} value The value to set the src to.
   * @param {string} origin The origin of the method.
   * @return {Promise<void>} A promise that resolves if the input is valid.
   */
  public static validateIdInput(
      id: string, value: string, origin: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error(`${origin}: id was empty`));
      }
      const imageElement = document.getElementById(id) as HTMLImageElement;

      if (!imageElement) {
        return reject(new Error(
            `${origin}: Couldn't get element with id: ${id}`));
      }


      if (!(imageElement.src)) {
        return reject(new Error(
            `${origin}: ${id} does not have a src attribute`));
      }

      if (!value) {
        return reject(new Error(`${origin}: value was empty`));
      }

      return resolve();
    });
  }

  /**
   * Validates the input for the async SrcByElement-methods.
   * @param {HTMLImageElement} element The id of the element to set the src to.
   * @param {string} value The value to set the src to.
   * @param {string} origin The origin of the method.
   * @return {Promise<void>} A promise that resolves if the input is valid.
   */
  public static validateElementInput(element: HTMLImageElement,
      value: string, origin: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!element) {
        return reject(new Error(`${origin}: Element can not be null`));
      }

      if (!(element.src)) {
        return reject(new Error(
            `${origin}: Element does not have a src attribute`));
      }

      if (!value) {
        return reject(new Error(`${origin}: value was empty`));
      }

      return resolve();
    });
  }
}
