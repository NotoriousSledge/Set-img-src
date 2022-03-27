export default class ImgSrcHelper {
  static revokeURL(value) {
    try {
      const objectURL = this.getURLObject();
      if (value) {
        objectURL.revokeObjectURL(value);
      }
    } catch (err) {
      throw (err);
    }
  }

  static getURLObject() {
    try {
      if (window) {
        return window.URL || window.webkitURL;
      } else {
        throw new Error('Cannot create an URL Object without a Window.');
      }
    } catch (err) {
      throw err;
    }
  }

  static checkWindow() {
    try {
      if (window) {
        if (document) {
          return;
        } else {
          throw new Error('No document found!');
        }
      } else {
        throw new Error('No window found!');
      }
    } catch (err) {
      throw (err);
    }
  }

  static validateInput(id, value, key, origin) {
    try {
      this.checkWindow();
    } catch (err) {
      throw err;
    }
    if (!id) {
      throw new Error(`${origin}: id was empty.`);
    }
    let imageElement;
    try {
      imageElement = document.getElementById(id);
    } catch (err) {
      throw err;
    }

    if (!imageElement) {
      throw new Error(`${origin}: Couldn't get element with id: ${id}`);
    }


    if (!(imageElement.src)) {
      throw new Error(`${origin}: ${id} does not have a src attribute.`);
    }

    if (!value) {
      throw new Error(`${origin}: ${key} was empty.`);
    }
  }

  static convertDataUrltoBlob(url) {
    return new Promise((resolve, reject) => {
      fetch(url).then((res) => {
        res.blob().then((blob) => {
          return resolve(blob);
        }).catch((err) => {
          return reject(err);
        });
      }).catch((err) =>{
        return reject(err);
      });
    });
  }

  static convertBase64toBlob(base64) {
    const url = `data:image/jpg;base64,${base64}`;
    return this.convertDataUrltoBlob(url);
  }
}
