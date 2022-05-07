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
    await ImgSrcAsyncHandler.removeSrcById(id);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    expect(clonedElement?.src === removeValue).toBeFalsy();
    document.body.removeChild(clonedElement);
  });

  it('should throw an error if the id is empty', async () => {
    await expectAsync(ImgSrcAsyncHandler.removeSrcById(''))
        .toBeRejectedWithError('removeSrcByIdAsync: id was empty');
  });

  it('should throw an error if id is invalid', async () => {
    const id = 'invalidIdRemoveIdAsync';
    await expectAsync(ImgSrcAsyncHandler.removeSrcById(id))
        .toBeRejectedWithError(
            `removeSrcByIdAsync: Couldn't get element with id: ${id}`);
  });

  it('should throw an error if element is invalid', async () => {
    const id = 'invalidElementRemoveIdAsync';
    const invalidElement = document.createElement('div');
    invalidElement.id = id;
    document.body.appendChild(invalidElement);
    await expectAsync(ImgSrcAsyncHandler.removeSrcById(id))
        .toBeRejectedWithError(
            `removeSrcByIdAsync: ${id} does not have a src attribute`);
  });

  it('should also copy the events of an element', async () => {
    function handleClick(event: Event) {
      const self = document
          .getElementById('eventRemoveIdAsync') as HTMLImageElement;
      self.className = 'removeValue';
    }

    const id = 'eventRemoveIdAsync';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick);

    document.body.appendChild(imageElement);

    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick}];

    await ImgSrcAsyncHandler.removeSrcById(id, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    expect(clonedElement.className).toBe('removeValue');
  });

  it('should also copy the events with options of an element', async () => {
    function handleClick(event: Event) {
      const self = document.getElementById(
          'optionRemoveIdAsync') as HTMLImageElement;
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

    const id = 'optionRemoveIdAsync';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick, options);

    document.body.appendChild(imageElement);


    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick, Options: options}];

    await ImgSrcAsyncHandler.removeSrcById(id, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    clonedElement.click();
    expect(clonedElement.className).toBe('1');
    document.body.removeChild(clonedElement);
  });
});
