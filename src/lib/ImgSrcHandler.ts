export default class ImgSrcHandler {
  public static setSrcByIdBase64(id: string,
      base64: string, eventProperties?: EventProperty[]) {
    try {
      this.validateIdInput(id, base64, 'base64', 'setSrcByIdBase64');
    } catch (err) {
      throw err;
    }
    const dataUrl = this.base64ToDataURL(base64);
    this.setSrcById(id, dataUrl, eventProperties);
  }

  public static setSrcByIdDataUrl(id: string, dataUrl: string,
      eventProperties?: EventProperty[]) {
    try {
      this.validateIdInput(id, dataUrl, 'dataUrl', 'setSrcByIdDataUrl');
    } catch (err) {
      throw err;
    }
    this.setSrcById(id, dataUrl, eventProperties);
  }

  public static removeSrcById(id: string) {
    try {
      this.validateIdInput(id, 'REMOVE', 'REMOVE', 'removeSrcById');
    } catch (err) {
      throw err;
    }
    this.setSrcById(id, '');
  }


  public static setSrcByElementBase64(image: HTMLImageElement,
      base64: string, eventProperties?: EventProperty[] ) {
    try {
      this.validateElementInput(image, base64, 'base64',
          'setSrcByElementBase64');
    } catch (err) {
      throw err;
    }
    const dataUrl = this.base64ToDataURL(base64);
    this.setSrcByElement(image, dataUrl, eventProperties);
  }

  public static setSrcByElementDataUrl(image: HTMLImageElement,
      dataUrl: string, eventProperties?: EventProperty[]) {
    try {
      this.validateElementInput(image, dataUrl, 'dataUrl',
          'setSrcByElementDataUrl');
    } catch (err) {
      throw err;
    }
    this.setSrcByElement(image, dataUrl, eventProperties);
  }

  public static removeSrcByElement(image: HTMLImageElement,
      eventProperties?: EventProperty[]) {
    try {
      this.validateElementInput(image, 'REMOVE', 'REMOVE',
          'removeSrcByElement');
    } catch (err) {
      throw err;
    }
    this.setSrcByElement(image, '', eventProperties);
  }

  private static base64ToDataURL(base64: string): string {
    return `data:image/jpeg;base64,${base64}`;
  }


  private static setSrcById(id: string,
      dataUrl: string, eventProperties?: EventProperty[]) {
    const image = document.getElementById(id) as HTMLImageElement;
    this.setSrcByElement(image, dataUrl, eventProperties);
  }

  private static setSrcByElement(image: HTMLImageElement,
      dataUrl: string, eventProperties?: EventProperty[]) {
    const clone = image.cloneNode(true) as HTMLImageElement;
    clone.src = dataUrl;

    eventProperties?.forEach((prop) => {
      if (prop.Options) {
        clone.addEventListener(prop.Event, prop.Listener, prop.Options);
      } else {
        clone.addEventListener(prop.Event, prop.Listener);
      }
    });

    image.parentNode?.replaceChild(clone, image);
  }

  private static validateIdInput(id: string, value: string,
      key: string, origin: string) {
    if (!id) {
      throw new Error(`${origin}: id was empty.`);
    }
    let imageElement;
    try {
      imageElement = document.getElementById(id) as HTMLImageElement;
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

  private static validateElementInput(element: HTMLImageElement, value: string,
      key: string, origin: string) {
    if (!element) {
      throw new Error(`${origin}: Element can not be null.`);
    }

    if (!(element.src)) {
      throw new Error(`${origin}: Element does not have a src attribute.`);
    }

    if (!value) {
      throw new Error(`${origin}: ${key} was empty.`);
    }
  }
}

interface EventProperty {
    Event: string,
    Listener: EventListenerOrEventListenerObject,
    Options?: boolean | AddEventListenerOptions | undefined
}
