import {ImgSrcHelper} from '../helpers';
export function setBlobById(id, blobData, previousValue, recursion) {
  return new Promise((resolve, reject) => {
    let objectURL;

    if (recursion) {
      try {
        ImgSrcHelper.validateInput(id, dataUrl,
            'dataUrl', 'setDataUrlById');
      } catch (err) {
        return reject(err);
      }
    }

    try {
      objectURL = ImgSrcHelper.getURLObject();
    } catch (err) {
      return reject(err);
    }

    try {
      ImgSrcHelper.revokeURL(previousValue);
    } catch (err) {
      return reject(err);
    }

    const imageElement = document.getElementById(id);
    const blobPhotoUrl = objectURL.createObjectURL(blobData);
    imageElement.src = blobPhotoUrl;
    return resolve(blobPhotoUrl);
  });
}

export function setBase64ById(id, base64, previousValue) {
  return new Promise((resolve, reject) => {
    ImgSrcHelper.convertBase64toBlob(base64).then((dataBlob) => {
      setBlobById(id, dataBlob, previousValue, true).then((blobUrl) => {
        return resolve(blobUrl);
      }).catch((err) => {
        return reject(err);
      });
    }).catch((err) => {
      return reject(err);
    });
  });
}

export function setDataUrlById(id, dataUrl, previousValue) {
  return new Promise((resolve, reject) => {
    try {
      ImgSrcHelper.validateInput(id, dataUrl,
          'dataUrl', 'setDataUrlById');
    } catch (err) {
      return reject(err);
    }

    ImgSrcHelper.convertDataUrltoBlob(dataUrl).then((dataBlob) => {
      setBlobById(id, dataBlob, previousValue, true).then((blobUrl) => {
        return resolve(blobUrl);
      }).catch((err) => {
        return reject(err);
      });
    }).catch((err) => {
      return reject(err);
    });
  });
}

export function removeImageById(id, value) {
  return new Promise((resolve, reject) => {
    try {
      ImgSrcHelper.validateInput(id, 'REMOVE', 'REMOVE', 'removeImage');
    } catch (err) {
      return reject(err);
    }

    const imageElement = document.getElementById(id);
    imageElement.src = '';
    try {
      ImgSrcHelper.revokeURL(value);
    } catch (err) {
      return reject(err);
    }

    resolve();
  });
}

export function revokeUrls(urls) {
  return new Promise((resolve, reject) => {
    urls.forEach((url) => {
      try {
        ImgSrcHelper.revokeURL(url);
      } catch (err) {
        return reject(err);
      }
    });
    return resolve();
  });
}
