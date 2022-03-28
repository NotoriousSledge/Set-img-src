import {EventProperty} from '../models';
export default class ImgSrcHelper {
  public static validateIdInput(id: string, value: string, origin: string) {
    if (!id) {
      throw new Error(`${origin}: id was empty`);
    }
    const imageElement = document.getElementById(id) as HTMLImageElement;


    if (!imageElement) {
      throw new Error(`${origin}: Couldn't get element with id: ${id}`);
    }


    if (!(imageElement.src)) {
      throw new Error(`${origin}: ${id} does not have a src attribute`);
    }

    if (!value) {
      throw new Error(`${origin}: value was empty`);
    }
  }

  public static validateElementInput(element: HTMLImageElement,
      value: string, origin: string) {
    if (!element) {
      throw new Error(`${origin}: Element can not be null`);
    }

    if (!(element.src)) {
      throw new Error(`${origin}: Element does not have a src attribute`);
    }

    if (!value) {
      throw new Error(`${origin}: value was empty`);
    }
  }

  public static setSrcById(id: string,
      dataUrl: string, eventProperties?: EventProperty[]) {
    const image = document.getElementById(id) as HTMLImageElement;
    this.setSrcByElement(image, dataUrl, eventProperties);
  }

  public static setSrcByElement(image: HTMLImageElement,
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


  public static base64ToDataURL(base64: string): string {
    return `data:image/jpeg;base64,${base64}`;
  }
}

