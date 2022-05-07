/* eslint-disable require-jsdoc */
import {EventProperty, ImgSrcHandler} from '../src/index';
describe('setSrcById', function() {
  it('should be able to change the dataUrl of an element by Id', function() {
    const id = 'dataUrlId';
    const imageElement = document.createElement('img');
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'srcValue';
    document.body.appendChild(imageElement);
    ImgSrcHandler.setSrcById(id, dataUrl);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    expect(clonedElement?.src).toBe(dataUrl);
    document.body.removeChild(clonedElement);
  });

  it('should be able to change the base64 of an element by Id', function() {
    const id = 'base64Id';
    const imageElement = document.createElement('img');
    const base64 = `dataURLValue`;
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'srcValue';
    document.body.appendChild(imageElement);
    ImgSrcHandler.setSrcById(id, base64);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    expect(clonedElement?.src).toBe(dataUrl);
    document.body.removeChild(clonedElement);
  });

  it('should throw an error if the id is empty', function() {
    expect( function() {
      ImgSrcHandler.setSrcById('', 'value');
    } ).toThrow(new Error('setSrcById: id was empty'));
  });

  it('should throw an error if id is invalid', function() {
    const id = 'invalidId';
    expect( function() {
      ImgSrcHandler.setSrcById(id, 'value');
    } ).toThrow(
        new Error(`setSrcById: Couldn't get element with id: ${id}`));
  });

  it('should throw an error if element is invalid', function() {
    const id = 'invalidElementId';
    const invalidElement = document.createElement('div');
    invalidElement.id = id;
    document.body.appendChild(invalidElement);
    expect( function() {
      ImgSrcHandler.setSrcById(id, 'value');
    } ).toThrow(
        new Error(`setSrcById: ${id} does not have a src attribute`));
  });

  it('should throw an error if value is empty', function() {
    const id = 'emptyValueId';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'srcValue';
    document.body.appendChild(imageElement);

    expect( function() {
      ImgSrcHandler.setSrcById(id, '');
    } ).toThrow(
        new Error(`setSrcById: value was empty`));
  });

  it('should also copy the events of an element', function() {
    function handleClick(event: Event) {
      const self = document.getElementById('idEvent') as HTMLImageElement;
      const currentClass = self.className;
      if (!currentClass) {
        self.className = '1';
      } else if (currentClass) {
        const num = Number.parseInt(currentClass);
        self.className = `${num + 1}`;
      }
    }

    const id = 'idEvent';
    const imageElement = document.createElement('img');
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick);

    document.body.appendChild(imageElement);

    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick}];

    ImgSrcHandler.setSrcById(id, dataUrl, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    clonedElement.click();
    expect(clonedElement.className).toBe('2');
    document.body.removeChild(clonedElement);
  });

  it('should also copy the events with options of an element', function() {
    function handleClick(event: Event) {
      const self = document.getElementById('idOption') as HTMLImageElement;
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

    const id = 'idOption';
    const imageElement = document.createElement('img');
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick, options);

    document.body.appendChild(imageElement);


    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick, Options: options}];

    ImgSrcHandler.setSrcById(id, dataUrl, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    clonedElement.click();
    expect(clonedElement.className).toBe('1');
    document.body.removeChild(clonedElement);
  });
});
