import ImgSrcAsyncHelper from '../helpers/ImgSrcAsyncHelper';
import {EventProperty} from '../models';
export function setSrcByIdAsync(id: string,
    value: string, eventProperties?: EventProperty[]): Promise<void> {
  return new Promise((resolve, reject) => {
    ImgSrcAsyncHelper.validateIdInput(id, value, 'setSrcByIdAsync')
        .then(() => {
          let dataUrl: string;
          if (value.indexOf(';base64,') > -1) {
            dataUrl = value;
          } else {
            dataUrl = ImgSrcAsyncHelper.base64ToDataURL(value);
          }

          ImgSrcAsyncHelper.setSrcById(id, dataUrl, eventProperties)
              .then(() => {
                return resolve();
              })
              .catch((err) => {
                return reject(err);
              });
        })
        .catch((err) => {
          return reject(err);
        });
  });
}

export function removeSrcByIdAsync(id: string,
    eventProperties?: EventProperty[]): Promise<void> {
  return new Promise((resolve, reject) => {
    ImgSrcAsyncHelper.validateIdInput(id, 'REMOVE', 'removeSrcById')
        .then(() => {
          ImgSrcAsyncHelper.setSrcById(id, '', eventProperties)
              .then(() => {
                return resolve();
              })
              .catch((err) => {
                return reject(err);
              });
        })
        .catch((err) => {
          return reject(err);
        });
  });
}

export function setSrcByElementAsync(image: HTMLImageElement,
    value: string, eventProperties?: EventProperty[] ): Promise<void> {
  return new Promise((resolve, reject) => {
    ImgSrcAsyncHelper.validateElementInput(image, value, 'setSrcByElementAsync')
        .then(() => {
          let dataUrl: string;
          if (value.indexOf(';base64,') > -1) {
            dataUrl = value;
          } else {
            dataUrl = ImgSrcAsyncHelper.base64ToDataURL(value);
          }

          ImgSrcAsyncHelper.setSrcByElement(image, dataUrl, eventProperties)
              .then(() => {
                return resolve();
              })
              .catch((err) => {
                return reject(err);
              });
        })
        .catch((err) => {
          return reject(err);
        });
  });
}

export function removeSrcByElementAsync(image: HTMLImageElement,
    eventProperties?: EventProperty[]): Promise<void> {
  return new Promise((resolve, reject) => {
    ImgSrcAsyncHelper.validateElementInput(
        image, 'REMOVE', 'removeSrcByElement')
        .then(() => {
          ImgSrcAsyncHelper.setSrcByElement(image, '', eventProperties)
              .then(() => {
                return resolve();
              })
              .catch((err) => {
                return reject(err);
              });
        })
        .catch((err) => {
          return reject(err);
        });
  });
}
