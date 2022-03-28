import {EventProperty, setSrcByElement} from '../src/index';
describe('setSrcByElement', function() {
  it('should be able to change the dataUrl of an element', function() {
    const id = 'dataUrlElement';
    const dataImage = document.createElement('img');
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    dataImage.id = id;
    dataImage.src = 'srcValue';
    document.body.appendChild(dataImage);
    setSrcByElement(dataImage, dataUrl);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    expect(clonedElement?.src).toBe(dataUrl);
    document.body.removeChild(clonedElement);
  });

  it('should be able to change the base64 of an element', function() {
    const id = 'base64Element';
    const imageElement = document.createElement('img');
    const base64 = `dataURLValue`;
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'srcValue';
    document.body.appendChild(imageElement);
    setSrcByElement(imageElement, base64);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    expect(clonedElement?.src).toBe(dataUrl);
    document.body.removeChild(clonedElement);
  });

  it('should throw an error if the element is null', function() {
    expect( function() {
      const nullElement = document.getElementById('null') as HTMLImageElement;
      setSrcByElement(nullElement, 'value');
    } ).toThrow(new Error('setSrcByElement: Element can not be null'));
  });

  it('should throw an error if element is invalid', function() {
    const id = 'invalidElement';
    const invalidElement = document.createElement('div');
    invalidElement.id = id;
    document.body.appendChild(invalidElement);
    expect( function() {
      setSrcByElement(invalidElement as HTMLImageElement, 'value');
    } ).toThrow(
        new Error(`setSrcByElement: Element does not have a src attribute`));
  });

  it('should throw an error if value is empty', function() {
    const id = 'emptyValueElement';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'srcValue';
    document.body.appendChild(imageElement);

    expect( function() {
      setSrcByElement(imageElement, '');
    } ).toThrow(
        new Error(`setSrcByElement: value was empty`));
  });

  it('should also copy the events of an element', function() {
    function handleClick(event: Event) {
      const self = document.getElementById('elementEvent') as HTMLImageElement;
      self.className = 'eventValue';
    }

    const id = 'elementEvent';
    const imageElement = document.createElement('img');
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick);

    document.body.appendChild(imageElement);

    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick}];

    setSrcByElement(imageElement, dataUrl, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    expect(clonedElement.className).toBe('eventValue');
    document.body.removeChild(clonedElement);
  });

  it('should also copy the events with options of an element', function() {
    function handleClick(event: Event) {
      const self = document.getElementById('elementOption') as HTMLImageElement;
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

    const id = 'elementOption';
    const imageElement = document.createElement('img');
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick, options);

    document.body.appendChild(imageElement);


    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick, Options: options}];

    setSrcByElement(imageElement, dataUrl, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    clonedElement.click();
    expect(clonedElement.className).toBe('1');
    document.body.removeChild(clonedElement);
  });
});
