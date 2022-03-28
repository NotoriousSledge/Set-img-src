import {ImgSrcHelper} from '../helpers';
import {EventProperty} from '../models';

export function setSrcById(id: string,
    value: string, eventProperties?: EventProperty[]) {
  try {
    ImgSrcHelper.validateIdInput(id, value, 'setSrcByIdBase64');
  } catch (err) {
    throw err;
  }
  if (value.indexOf(';base64,') > -1) {
    ImgSrcHelper.setSrcById(id, value, eventProperties);
  } else {
    ImgSrcHelper.setSrcById(
        id, ImgSrcHelper.base64ToDataURL(value), eventProperties);
  }
}

export function removeSrcById(id: string, eventProperties?: EventProperty[]) {
  try {
    ImgSrcHelper.validateIdInput(id, 'REMOVE', 'removeSrcById');
  } catch (err) {
    throw err;
  }
  ImgSrcHelper.setSrcById(id, '', eventProperties);
}


export function setSrcByElement(image: HTMLImageElement,
    value: string, eventProperties?: EventProperty[] ) {
  try {
    ImgSrcHelper.validateElementInput(image, value,
        'setSrcByElementBase64');
  } catch (err) {
    throw err;
  }

  if (value.indexOf(';base64,') > -1) {
    ImgSrcHelper.setSrcByElement(image, value, eventProperties);
  } else {
    ImgSrcHelper.setSrcByElement(
        image, ImgSrcHelper.base64ToDataURL(value), eventProperties);
  }
}

export function removeSrcByElement(image: HTMLImageElement,
    eventProperties?: EventProperty[]) {
  try {
    ImgSrcHelper.validateElementInput(image, 'REMOVE',
        'removeSrcByElement');
  } catch (err) {
    throw err;
  }
  ImgSrcHelper.setSrcByElement(image, '', eventProperties);
}


