import {ImgSrcHelper} from '../helpers';
export default class ImgSrcHandler {
  dataValues = {};
  recurse = false;
  constructor() {
  }


  revokeUrls() {
    return new Promise((resolve, reject) => {
      const urls = Object.values(this.dataValues);
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

  setBlobById(id, blobData) {
    return new Promise((resolve, reject) => {
      let objectURL;

      if (!this.recurse) {
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
        this.recurse = false;
        return reject(err);
      }

      try {
        ImgSrcHelper.revokeURL(this.dataValues[id]);
      } catch (err) {
        this.recurse = false;
        return reject(err);
      }

      const imageElement = document.getElementById(id);
      const blobPhotoUrl = objectURL.createObjectURL(blobData);
      imageElement.src = blobPhotoUrl;
      this.dataValues[id] = blobPhotoUrl;
      this.recurse = false;
      return resolve();
    });
  }

  setBase64ById(id, base64) {
    return new Promise((resolve, reject) => {
      // Convert image (in base64) to binary data
      ImgSrcHelper.convertBase64toBlob(base64).then((dataBlob) => {
        this.recurse = true;
        this.setBlobById(id, dataBlob).then(() => {
          return resolve();
        }).catch((err) => {
          this.recurse = false;
          return reject(err);
        });
      }).catch((err) => {
        return reject(err);
      });
    });
  }

  setDataUrlById(id, dataUrl) {
    return new Promise((resolve, reject) => {
      try {
        ImgSrcHelper.validateInput(id, dataUrl,
            'dataUrl', 'setDataUrlById');
      } catch (err) {
        return reject(err);
      }

      ImgSrcHelper.convertDataUrltoBlob(dataUrl).then((dataBlob) => {
        this.recurse = true;
        this.setBlobById(id, dataBlob).then(() => {
          return resolve();
        }).catch((err) => {
          this.recurse = false;
          return reject(err);
        });
      }).catch((err) => {
        return reject(err);
      });
    });
  }

  removeImageById(id) {
    return new Promise((resolve, reject) => {
      try {
        ImgSrcHelper.validateInput(id, 'REMOVE', 'REMOVE', 'removeImage');
      } catch (err) {
        return reject(err);
      }

      const imageElement = document.getElementById(id);
      imageElement.src = '';
      try {
        ImgSrcHelper.revokeURL(this.dataValues[id]);
      } catch (err) {
        return reject(err);
      }

      resolve();
    });
  }
}
