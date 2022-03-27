export default class ImgSrcStaticHandler {
  static setBlobById(id: string,
    blobData: Blob, previousValue: string, recursion?: boolean): Promise<string>

  static setBase64ById(id: string,
    base64: string, previousValue: string): Promise<string>

  static setDataUrlById(id: string,
    dataUrl: string, previousValue: string): Promise<string>

  static removeImageById(id: string, value: string): Promise<void>

  static revokeUrls(urls: string): Promise<void>
}

