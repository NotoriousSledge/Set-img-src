import {EventProperty} from '../models';

/**
 * A helper class for setting the src of an image element.
 * Contains the implementation logic for the setSrc-methods.
 * @class ImgSrcHelper
 */
export class ImgSrcHelper {
  /**
   * Validates the input for the SrcById-methods.
   * @param {string} id The id of the element to set the src to.
   * @param {string} value The value to set the src to.
   * @param {string} origin The origin of the method.
   * @return {void}
   * @throws {Error} If any input is invalid.
   */
  public static validateIdInput(
      id: string, value: string, origin: string): void {
    if (!id) {
      throw new Error(`${origin}: id was empty`);
    }
    const imageElement = document.getElementById(id) as HTMLImageElement;


    if (!imageElement) {
      throw new Error(`${origin}: Couldn't get element with id: ${id}`);
    }


    if (!(imageElement.src)) {
      throw new Error(`${origin}: ${id} does not have a src attribute`);
    }

    if (!value) {
      throw new Error(`${origin}: value was empty`);
    }
  }

  /**
   * Validates the input for the SrcByElement-methods.
   * @param {HTMLImageElement} element The id of the element to set the src to.
   * @param {string} value The value to set the src to.
   * @param {string} origin The origin of the method.
   * @return {void}
   * @throws {Error} If any input is invalid.
   */
  public static validateElementInput(element: HTMLImageElement,
      value: string, origin: string): void {
    if (!element) {
      throw new Error(`${origin}: Element can not be null`);
    }

    if (!(element.src)) {
      throw new Error(`${origin}: Element does not have a src attribute`);
    }

    if (!value) {
      throw new Error(`${origin}: value was empty`);
    }
  }

  /**
   * Gets the element containing the id and then calls the srcByElement-method.
   * @param {string} id The id of the element to set the src to.
   * @param {string} dataUrl The value to set the src to.
   * @param {EventProperty[]} eventProperties The events to keep on the element.
   * @return {void}
   */
  public static setSrcById(id: string,
      dataUrl: string, eventProperties?: EventProperty[]): void {
    const image = document.getElementById(id) as HTMLImageElement;
    this.setSrcByElement(image, dataUrl, eventProperties);
  }

  /**
   * Sets the src of an image element.
   * The actual implementation of the method.
   * Bypasses the problem by cloning and replacing.
   * Instead of setting the src directly.
   * @param {HTMLImageElement} image The image element to set the src to.
   * @param {string} dataUrl The value to set the src to.
   * @param {EventProperty[]} eventProperties The events to keep on the element.
   * @return {void}
   */
  public static setSrcByElement(image: HTMLImageElement,
      dataUrl: string, eventProperties?: EventProperty[]) {
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
  }
}

