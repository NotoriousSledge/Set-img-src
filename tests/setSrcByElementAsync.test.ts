import {EventProperty, ImgSrcAsyncHandler} from '../src/index';
describe('setSrcByElementAsync', async () => {
  it('should be able to change the dataUrl of an element', async () => {
    const id = 'dataUrlElementAsync';
    const imageElement = document.createElement('img');
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'srcValue';
    document.body.appendChild(imageElement);
    await ImgSrcAsyncHandler.setSrcByElement(imageElement, dataUrl);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    expect(clonedElement?.src).toBe(dataUrl);
    document.body.removeChild(clonedElement);
  });

  it('should be able to change the base64 of an element', async () => {
    const id = 'base64ElementAsync';
    const imageElement = document.createElement('img');
    const base64 = `dataURLValue`;
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'srcValue';
    document.body.appendChild(imageElement);
    await ImgSrcAsyncHandler.setSrcByElement(imageElement, base64);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    expect(clonedElement?.src).toBe(dataUrl);
    document.body.removeChild(clonedElement);
  });

  it('should throw an error if element is null', async () => {
    const id = 'nullElementAsync';
    const nullElement = document.getElementById(id);
    await expectAsync(
        ImgSrcAsyncHandler
            .setSrcByElement(nullElement as HTMLImageElement, 'value')).
        toBeRejectedWithError(
            `setSrcByElementAsync: Element can not be null`);
  });

  it('should throw an error if element is invalid', async () => {
    const id = 'invalidElementAsync';
    const invalidElement = document.createElement('div');
    invalidElement.id = id;
    document.body.appendChild(invalidElement);
    await expectAsync(
        ImgSrcAsyncHandler
            .setSrcByElement(invalidElement as HTMLImageElement, 'value')).
        toBeRejectedWithError(
            `setSrcByElementAsync: Element does not have a src attribute`);
  });

  it('should throw an error if value is empty', async () => {
    const id = 'emptyValueElementAsync';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'srcValue';
    document.body.appendChild(imageElement);

    await expectAsync(ImgSrcAsyncHandler.setSrcByElement(imageElement, '')).
        toBeRejectedWithError(`setSrcByElementAsync: value was empty`);
  });

  it('should also copy the events of an element', async () => {
    function handleClick(event: Event) {
      const self = document
          .getElementById('elementEventAsync') as HTMLImageElement;
      const currentClass = self.className;
      if (!currentClass) {
        self.className = '1';
      } else if (currentClass) {
        const num = Number.parseInt(currentClass);
        self.className = `${num + 1}`;
      }
    }

    const id = 'elementEventAsync';
    const imageElement = document.createElement('img');
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick);

    document.body.appendChild(imageElement);

    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick}];

    await ImgSrcAsyncHandler.setSrcByElement(imageElement, dataUrl, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    clonedElement.click();
    expect(clonedElement.className).toBe('2');
    document.body.removeChild(clonedElement);
  });

  it('should also copy the events with options of an element', async () => {
    function handleClick(event: Event) {
      const self = document
          .getElementById('elementOptionAsync') as HTMLImageElement;
      const currentClass = self.className;
      if (!currentClass) {
        self.className = '1';
      } else if (currentClass) {
        const num = Number.parseInt(currentClass);
        self.className = `${num + 1}`;
      }
    }

    const options: AddEventListenerOptions = {
      once: true,
    };

    const id = 'elementOptionAsync';
    const imageElement = document.createElement('img');
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick, options);

    document.body.appendChild(imageElement);


    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick, Options: options}];

    await ImgSrcAsyncHandler.setSrcByElement(imageElement, dataUrl, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    clonedElement.click();
    expect(clonedElement.className).toBe('1');
    document.body.removeChild(clonedElement);
  });
});
