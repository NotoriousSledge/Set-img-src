import {ImgSrcAsyncHelper, parseDataString} from '../helpers';
import {EventProperty} from '../models';
/**
  * Sets the src of an image element by Id.
  * @param {string} id The id of the element to set the src to.
  * @param {string} value The value to set the src to.
  * @param {EventProperty[]} eventProperties The events to keep on the element.
  * @return {Promise<void>} A promise that resolves when the src is set.
  */
export function setSrcByIdAsync(id: string,
    value: string, eventProperties?: EventProperty[]): Promise<void> {
  return new Promise((resolve, reject) => {
    ImgSrcAsyncHelper.validateIdInput(id, value, 'setSrcByIdAsync')
        .then(() => {
          ImgSrcAsyncHelper.setSrcById(id, parseDataString(value),
              eventProperties)
              .then(() => {
                return resolve();
              });
        })
        .catch((err) => {
          return reject(err);
        });
  });
}

/**
  * Removes the src of an image element by Id.
  * @param {string} id The id of the element to remove the src from.
  * @param {EventProperty[]} eventProperties The events to keep on the element.
  * @return {Promise<void>} A promise that resolves when the src is removed.
 */
export function removeSrcByIdAsync(id: string,
    eventProperties?: EventProperty[]): Promise<void> {
  return new Promise((resolve, reject) => {
    ImgSrcAsyncHelper.validateIdInput(id, 'REMOVE', 'removeSrcByIdAsync')
        .then(() => {
          ImgSrcAsyncHelper.setSrcById(id, '', eventProperties)
              .then(() => {
                return resolve();
              });
        })
        .catch((err) => {
          return reject(err);
        });
  });
}

/**
 * Sets the src of an image element.
 * @param {HTMLImageElement} image The image element to set the src to.
 * @param {string} value The value to set the src to.
 * @param {EventProperty[]} eventProperties The events to keep on the element.
 * @return {Promise<void>} A promise that resolves when the src is set.
 */
export function setSrcByElementAsync(image: HTMLImageElement,
    value: string, eventProperties?: EventProperty[] ): Promise<void> {
  return new Promise((resolve, reject) => {
    ImgSrcAsyncHelper.validateElementInput(image, value, 'setSrcByElementAsync')
        .then(() => {
          ImgSrcAsyncHelper.setSrcByElement(image, parseDataString(value),
              eventProperties)
              .then(() => {
                return resolve();
              });
        })
        .catch((err) => {
          return reject(err);
        });
  });
}

/**
  * Removes the src of an image element.
  * @param {HTMLImageElement} image The image element to to remove the src from.
  * @param {EventProperty[]} eventProperties The events to keep on the element.
  * @return {Promise<void>} A promise that resolves when the src is removed.
 */
export function removeSrcByElementAsync(image: HTMLImageElement,
    eventProperties?: EventProperty[]): Promise<void> {
  return new Promise((resolve, reject) => {
    ImgSrcAsyncHelper.validateElementInput(
        image, 'REMOVE', 'removeSrcByElementAsync')
        .then(() => {
          ImgSrcAsyncHelper.setSrcByElement(image, '', eventProperties)
              .then(() => {
                return resolve();
              });
        })
        .catch((err) => {
          return reject(err);
        });
  });
}
