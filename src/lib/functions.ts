import {ImgSrcHelper, parseDataString} from '../helpers';
import {EventProperty} from '../models';


/**
 * Sets the src of an image element by id.
 * @param {string} id  The id of the element to set the src to.
 * @param {string} value The value to set the src to.
 * @param {EventProperty[]} eventProperties The events to keep on the element.
 * @return {void}
 */
export function setSrcById(id: string,
    value: string, eventProperties?: EventProperty[]): void {
  try {
    ImgSrcHelper.validateIdInput(id, value, 'setSrcById');
  } catch (err) {
    throw err;
  }

  ImgSrcHelper.setSrcById(id, parseDataString(value), eventProperties);
}

/**
 * Removes the src of an image element by id.
 * @param {string} id The id of the element to remove the src from.
 * @param {EventProperty[]} eventProperties The events to keep on the element.
 * @return {void}
 */
export function removeSrcById(id: string,
    eventProperties?: EventProperty[]): void {
  try {
    ImgSrcHelper.validateIdInput(id, 'REMOVE', 'removeSrcById');
  } catch (err) {
    throw err;
  }
  ImgSrcHelper.setSrcById(id, '', eventProperties);
}

/**
 * Sets the src of an image element.
 * @param {HTMLImageElement} image The image element to set the src to.
 * @param {string} value The value to set the src to.
 * @param {EventProperty[]} eventProperties The events to keep on the element.
 * @return {void}
 */
export function setSrcByElement(image: HTMLImageElement,
    value: string, eventProperties?: EventProperty[] ): void {
  try {
    ImgSrcHelper.validateElementInput(image, value,
        'setSrcByElement');
  } catch (err) {
    throw err;
  }


  ImgSrcHelper.setSrcByElement(image, parseDataString(value), eventProperties);
}

/**
 * Removes the src of an image element.
 * @param {HTMLImageElement} image The image element to remove the src from.
 * @param {EventProperty[]} eventProperties The events to keep on the element.
 * @return {void}
 */
export function removeSrcByElement(image: HTMLImageElement,
    eventProperties?: EventProperty[]): void {
  try {
    ImgSrcHelper.validateElementInput(image, 'REMOVE',
        'removeSrcByElement');
  } catch (err) {
    throw err;
  }
  ImgSrcHelper.setSrcByElement(image, '', eventProperties);
}


