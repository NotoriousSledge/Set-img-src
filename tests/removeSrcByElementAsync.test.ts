/* eslint-disable require-jsdoc */
import {EventProperty, ImgSrcAsyncHandler} from '../src/index';
describe('removeSrcByIdAsync', async () => {
  it('should be able to remove the src of an element by Id', async () => {
    const id = 'removeIdAsync';
    const removeValue = 'removeValue';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'removeValue';
    document.body.appendChild(imageElement);
    await ImgSrcAsyncHandler
        .removeSrcByElement(imageElement);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    expect(clonedElement?.src === removeValue).toBeFalsy();
    document.body.removeChild(clonedElement);
  });

  it('should throw an error if element is null', async () => {
    const id = 'nullRemoveElementAsync';
    const nullElement = document.getElementById(id);
    await expectAsync(ImgSrcAsyncHandler
        .removeSrcByElement(nullElement as HTMLImageElement))
        .toBeRejectedWithError(
            `removeSrcByElementAsync: Element can not be null`);
  });

  it('should throw an error if element is invalid', async () => {
    const id = 'invalidElementRemoveElementAsync';
    const invalidElement = document.createElement('div');
    invalidElement.id = id;
    document.body.appendChild(invalidElement);
    await expectAsync(ImgSrcAsyncHandler
        .removeSrcByElement(invalidElement as HTMLImageElement))
        .toBeRejectedWithError(
            `removeSrcByElementAsync: Element does not have a src attribute`);
  });

  it('should also copy the events of an element', async () => {
    function handleClick(event: Event) {
      const self = document
          .getElementById('eventRemoveElementAsync') as HTMLImageElement;
      self.className = 'removeValue';
    }

    const id = 'eventRemoveElementAsync';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick);

    document.body.appendChild(imageElement);

    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick}];

    await ImgSrcAsyncHandler.removeSrcByElement(imageElement, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    expect(clonedElement.className).toBe('removeValue');
  });

  it('should also copy the events with options of an element', async () => {
    function handleClick(event: Event) {
      const self = document.getElementById(
          'optionRemoveElementAsync') as HTMLImageElement;
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

    const id = 'optionRemoveElementAsync';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick, options);

    document.body.appendChild(imageElement);


    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick, Options: options}];

    await ImgSrcAsyncHandler.removeSrcByElement(imageElement, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    clonedElement.click();
    expect(clonedElement.className).toBe('1');
    document.body.removeChild(clonedElement);
  });
});
