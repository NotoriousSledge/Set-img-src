export function setBlobById(id: string, blobData: Blob,
    previousValue: string, recursion?: boolean): Promise<string>

export function setBase64ById(id: string,
    base64: string, previousValue: string): Promise<string>

export function setDataUrlById(id: string,
    dataUrl: string, previousValue: string): Promise<string>

export function removeImageById(id: string, value: string): Promise<void>

export function revokeUrls(urls: string[]): Promise<void>
