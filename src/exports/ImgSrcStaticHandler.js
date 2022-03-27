import * as funk from './functions';
export default class ImgSrcStaticHandler {
  static setBlobById(id, blobData, previousValue, recursion) {
    return funk.setBlobById(id, blobData, previousValue, recursion);
  }

  static setBase64ById(id, base64, previousValue) {
    return funk.setBase64ById(id, base64, previousValue);
  }

  static setDataUrlById(id, dataUrl, previousValue) {
    return funk.setDataUrlById(id, dataUrl, previousValue);
  }

  static removeImageById(id, value) {
    return funk.removeImageById(id, value);
  }

  static revokeUrls(urls) {
    return funk.revokeUrls(urls);
  }
}
