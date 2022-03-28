import {EventProperty} from '../models';

export default class ImgSrcAsyncHelper {
  public static setSrcById(id: string,
      dataUrl: string, eventProperties?: EventProperty[]): Promise<void> {
    return new Promise((async (resolve, reject) => {
      const image = document.getElementById(id) as HTMLImageElement;
      try {
        await this.setSrcByElement(image, dataUrl, eventProperties);
        return resolve();
      } catch (err) {
        return reject(err);
      }
    }));
  }

  public static setSrcByElement(image: HTMLImageElement,
      dataUrl: string, eventProperties?: EventProperty[]): Promise<void> {
    return new Promise((resolve, reject) => {
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
      return resolve();
    });
  }

  public static validateIdInput(
      id: string, value: string, origin: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error(`${origin}: id was empty`));
      }
      let imageElement;
      try {
        imageElement = document.getElementById(id) as HTMLImageElement;
      } catch (err) {
        return reject(err);
      }

      if (!imageElement) {
        return reject(new Error(
            `${origin}: Couldn't get element with id: ${id}`));
      }


      if (!(imageElement.src)) {
        return reject(new Error(
            `${origin}: ${id} does not have a src attribute`));
      }

      if (!value) {
        return reject(new Error(`${origin}: value was empty`));
      }

      return resolve();
    });
  }

  public static validateElementInput(element: HTMLImageElement,
      value: string, origin: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!element) {
        return reject(new Error(`${origin}: Element can not be null.`));
      }

      if (!(element.src)) {
        return reject(new Error(
            `${origin}: Element does not have a src attribute.`));
      }

      if (!value) {
        return reject(new Error(`${origin}: value was empty.`));
      }

      return resolve();
    });
  }

  public static base64ToDataURL(base64: string): string {
    return `data:image/jpeg;base64,${base64}`;
  }
}
