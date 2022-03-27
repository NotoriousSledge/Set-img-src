export default class ImgSrcHandler {
  public constructor()

  public revokeUrls(): Promise<void>

  public setBlobById(id: string, blobData: Blob): Promise<void>

  public setBase64ById(id: string, base64: string): Promise<void>

  public setDataUrlbyId(id: string, dataUrl: string): Promise<void>

  public removeImageById(id: string): Promise<void>
}
