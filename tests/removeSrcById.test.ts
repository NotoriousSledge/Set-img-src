/* eslint-disable require-jsdoc */
import {EventProperty, ImgSrcHandler} from '../src/index';
describe('removeSrcById', function() {
  it('should be able to remove the src of an element by Id', function() {
    const id = 'removeId';
    const removeValue = 'removeValue';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'removeValue';
    document.body.appendChild(imageElement);
    ImgSrcHandler.removeSrcById(id);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    expect(clonedElement?.src === removeValue).toBeFalsy();
    document.body.removeChild(clonedElement);
  });

  it('should throw an error if the id is empty', function() {
    expect( function() {
      ImgSrcHandler.removeSrcById('');
    } ).toThrow(new Error('removeSrcById: id was empty'));
  });

  it('should throw an error if id is invalid', function() {
    const id = 'invalidIdRemoveId';
    expect( function() {
      ImgSrcHandler.removeSrcById(id);
    } ).toThrow(
        new Error(`removeSrcById: Couldn't get element with id: ${id}`));
  });

  it('should throw an error if element is invalid', function() {
    const id = 'invalidElementRemoveId';
    const invalidElement = document.createElement('div');
    invalidElement.id = id;
    document.body.appendChild(invalidElement);
    expect( function() {
      ImgSrcHandler.removeSrcById(id);
    } ).toThrow(
        new Error(`removeSrcById: ${id} does not have a src attribute`));
  });

  it('should also copy the events of an element', function() {
    function handleClick(event: Event) {
      const self = document.getElementById('eventRemoveId') as HTMLImageElement;
      self.className = 'removeValue';
    }

    const id = 'eventRemoveId';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick);

    document.body.appendChild(imageElement);

    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick}];

    ImgSrcHandler.removeSrcById(id, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    expect(clonedElement.className).toBe('removeValue');
  });

  it('should also copy the events with options of an element', function() {
    function handleClick(event: Event) {
      const self = document.getElementById(
          'optionRemoveId') as HTMLImageElement;
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

    const id = 'optionRemoveId';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick, options);

    document.body.appendChild(imageElement);


    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick, Options: options}];

    ImgSrcHandler.removeSrcById(id, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    clonedElement.click();
    expect(clonedElement.className).toBe('1');
    document.body.removeChild(clonedElement);
  });
});
