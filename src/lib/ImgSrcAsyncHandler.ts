export default class ImgSrcAsyncHandler {
  public static setSrcByIdBase64(id: string,
      base64: string, eventProperties?: EventProperty[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.validateIdInput(id, base64,
          'base64', 'setSrcByIdBase64').then(() => {
        const dataUrl = this.base64ToDataURL(base64);
        this.setSrcById(id, dataUrl, eventProperties).then(() => {
          return resolve();
        })
            .catch((err) => {
              return reject(err);
            });
      })
          .catch((err) => {
            return reject(err);
          });
    });
  }

  public static setSrcByIdDataUrl(id: string, dataUrl: string,
      eventProperties?: EventProperty[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.validateIdInput(id, dataUrl,
          'dataUrl', 'setSrcByIdDataUrl').then(() => {
        this.setSrcById(id, dataUrl, eventProperties).then(() => {
          return resolve();
        })
            .catch((err) => {
              return reject(err);
            });
      })
          .catch((err) => {
            return reject(err);
          });
    });
  }

  public static removeSrcById(id: string,
      eventProperties?: EventProperty[]): Promise<void> {
    try {
      this.validateIdInput(id, 'REMOVE', 'REMOVE', 'removeSrcById');
    } catch (err) {
      throw err;
    }
    this.setSrcById(id, '');

    return new Promise((resolve, reject) => {
      this.validateIdInput(id, 'REMOVE',
          'REMOVE', 'removeSrcById').then(() => {
        this.setSrcById(id, '', eventProperties).then(() => {
          return resolve();
        })
            .catch((err) => {
              return reject(err);
            });
      })
          .catch((err) => {
            return reject(err);
          });
    });
  }


  public static setSrcByElementBase64(image: HTMLImageElement,
      base64: string, eventProperties?: EventProperty[] ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.validateElementInput(image, base64,
          'base64', 'setSrcByElementBase64').then(() => {
        const dataUrl = this.base64ToDataURL(base64);
        this.setSrcByElement(image, dataUrl, eventProperties).then(() => {
          return resolve();
        })
            .catch((err) => {
              return reject(err);
            });
      })
          .catch((err) => {
            return reject(err);
          });
    });
  }

  public static setSrcByElementDataUrl(image: HTMLImageElement,
      dataUrl: string, eventProperties?: EventProperty[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.validateElementInput(image, dataUrl,
          'dataUrl', 'setSrcByElementDataUrl').then(() => {
        this.setSrcByElement(image, dataUrl, eventProperties).then(() => {
          return resolve();
        })
            .catch((err) => {
              return reject(err);
            });
      })
          .catch((err) => {
            return reject(err);
          });
    });
  }

  public static removeSrcByElement(image: HTMLImageElement,
      eventProperties?: EventProperty[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.validateElementInput(image, 'REMOVE',
          'REMOVE', 'removeSrcByElement').then(() => {
        this.setSrcByElement(image, '', eventProperties).then(() => {
          return resolve();
        })
            .catch((err) => {
              return reject(err);
            });
      })
          .catch((err) => {
            return reject(err);
          });
    });
  }

  private static base64ToDataURL(base64: string): string {
    return `data:image/jpeg;base64,${base64}`;
  }


  private static setSrcById(id: string,
      dataUrl: string, eventProperties?: EventProperty[]): Promise<void> {
    return new Promise(((resolve, reject) => {
      const image = document.getElementById(id) as HTMLImageElement;
      return this.setSrcByElement(image, dataUrl, eventProperties).then(() => {
        return resolve();
      })
          .catch((err) => {
            return reject(err);
          });
    }));
  }

  private static setSrcByElement(image: HTMLImageElement,
      dataUrl: string, eventProperties?: EventProperty[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const clone = image.cloneNode(true) as HTMLImageElement;
      clone.src = dataUrl;

      eventProperties?.forEach((prop) => {
        try {
          if (prop.Options) {
            clone.addEventListener(prop.Event, prop.Listener, prop.Options);
          } else {
            clone.addEventListener(prop.Event, prop.Listener);
          }
        } catch (err) {
          return reject(err);
        }
      });

      image.parentNode?.replaceChild(clone, image);
      return resolve();
    });
  }

  private static validateIdInput(id: string, value: string,
      key: string, origin: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!id) {
        return reject(new Error(`${origin}: id was empty.`));
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
            `${origin}: ${id} does not have a src attribute.`));
      }

      if (!value) {
        return reject(new Error(`${origin}: ${key} was empty.`));
      }

      return resolve();
    });
  }

  private static validateElementInput(element: HTMLImageElement, value: string,
      key: string, origin: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!element) {
        return reject(new Error(`${origin}: Element can not be null.`));
      }

      if (!(element.src)) {
        return reject(new Error(
            `${origin}: Element does not have a src attribute.`));
      }

      if (!value) {
        return reject(new Error(`${origin}: ${key} was empty.`));
      }

      return resolve();
    });
  }
}

  interface EventProperty {
      Event: string,
      Listener: EventListenerOrEventListenerObject,
      Options?: boolean | AddEventListenerOptions | undefined
  }

