
export function setSrcByIdBase64(id: string,
    base64: string, eventProperties?: EventProperty[]) {
  try {
    validateIdInput(id, base64, 'base64', 'setSrcByIdBase64');
  } catch (err) {
    throw err;
  }
  const dataUrl = base64ToDataURL(base64);
  setSrcById(id, dataUrl, eventProperties);
}

export function setSrcByIdDataUrl(id: string, dataUrl: string,
    eventProperties?: EventProperty[]) {
  try {
    validateIdInput(id, dataUrl, 'dataUrl', 'setSrcByIdDataUrl');
  } catch (err) {
    throw err;
  }
  setSrcById(id, dataUrl, eventProperties);
}

export function removeSrcById(id: string) {
  try {
    validateIdInput(id, 'REMOVE', 'REMOVE', 'removeSrcById');
  } catch (err) {
    throw err;
  }
  setSrcById(id, '');
}


export function setSrcByElementBase64(image: HTMLImageElement,
    base64: string, eventProperties?: EventProperty[] ) {
  try {
    validateElementInput(image, base64, 'base64',
        'setSrcByElementBase64');
  } catch (err) {
    throw err;
  }
  const dataUrl = base64ToDataURL(base64);
  setSrcByElement(image, dataUrl, eventProperties);
}

export function setSrcByElementDataUrl(image: HTMLImageElement,
    dataUrl: string, eventProperties?: EventProperty[]) {
  try {
    validateElementInput(image, dataUrl, 'dataUrl',
        'setSrcByElementDataUrl');
  } catch (err) {
    throw err;
  }
  setSrcByElement(image, dataUrl, eventProperties);
}

export function removeSrcByElement(image: HTMLImageElement,
    eventProperties?: EventProperty[]) {
  try {
    validateElementInput(image, 'REMOVE', 'REMOVE',
        'removeSrcByElement');
  } catch (err) {
    throw err;
  }
  setSrcByElement(image, '', eventProperties);
}

function base64ToDataURL(base64: string): string {
  return `data:image/jpeg;base64,${base64}`;
}


function setSrcById(id: string,
    dataUrl: string, eventProperties?: EventProperty[]) {
  const image = document.getElementById(id) as HTMLImageElement;
  setSrcByElement(image, dataUrl, eventProperties);
}

function setSrcByElement(image: HTMLImageElement,
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

function validateIdInput(id: string, value: string,
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

function validateElementInput(element: HTMLImageElement, value: string,
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

export function setSrcByIdBase64Async(id: string,
    base64: string, eventProperties?: EventProperty[]): Promise<void> {
  return new Promise((resolve, reject) => {
    validateIdInputAsync(id, base64,
        'base64', 'setSrcByIdBase64').then(() => {
      const dataUrl = base64ToDataURL(base64);
      setSrcByIdAsync(id, dataUrl, eventProperties).then(() => {
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

export function setSrcByIdDataUrlAsync(id: string, dataUrl: string,
    eventProperties?: EventProperty[]): Promise<void> {
  return new Promise((resolve, reject) => {
    validateIdInputAsync(id, dataUrl,
        'dataUrl', 'setSrcByIdDataUrl').then(() => {
      setSrcByIdAsync(id, dataUrl, eventProperties).then(() => {
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

export function removeSrcByIdAsync(id: string,
    eventProperties?: EventProperty[]): Promise<void> {
  try {
    validateIdInputAsync(id, 'REMOVE', 'REMOVE', 'removeSrcById');
  } catch (err) {
    throw err;
  }
  setSrcById(id, '');

  return new Promise((resolve, reject) => {
    validateIdInputAsync(id, 'REMOVE',
        'REMOVE', 'removeSrcById').then(() => {
      setSrcByIdAsync(id, '', eventProperties).then(() => {
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


export function setSrcByElementBase64Async(image: HTMLImageElement,
    base64: string, eventProperties?: EventProperty[] ): Promise<void> {
  return new Promise((resolve, reject) => {
    validateElementInputAsync(image, base64,
        'base64', 'setSrcByElementBase64').then(() => {
      const dataUrl = base64ToDataURL(base64);
      setSrcByElementAsync(image, dataUrl, eventProperties).then(() => {
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

export function setSrcByElementDataUrlAsync(image: HTMLImageElement,
    dataUrl: string, eventProperties?: EventProperty[]): Promise<void> {
  return new Promise((resolve, reject) => {
    validateElementInputAsync(image, dataUrl,
        'dataUrl', 'setSrcByElementDataUrl').then(() => {
      setSrcByElementAsync(image, dataUrl, eventProperties).then(() => {
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

export function removeSrcByElementAsync(image: HTMLImageElement,
    eventProperties?: EventProperty[]): Promise<void> {
  return new Promise((resolve, reject) => {
    validateElementInputAsync(image, 'REMOVE',
        'REMOVE', 'removeSrcByElement').then(() => {
      setSrcByElementAsync(image, '', eventProperties).then(() => {
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


function setSrcByIdAsync(id: string,
    dataUrl: string, eventProperties?: EventProperty[]): Promise<void> {
  return new Promise(((resolve, reject) => {
    const image = document.getElementById(id) as HTMLImageElement;
    return setSrcByElementAsync(image, dataUrl, eventProperties).then(() => {
      return resolve();
    })
        .catch((err) => {
          return reject(err);
        });
  }));
}

function setSrcByElementAsync(image: HTMLImageElement,
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

function validateIdInputAsync(id: string, value: string,
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

function validateElementInputAsync(element: HTMLImageElement, value: string,
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


interface EventProperty {
      Event: string,
      Listener: EventListenerOrEventListenerObject,
      Options?: boolean | AddEventListenerOptions | undefined
}

