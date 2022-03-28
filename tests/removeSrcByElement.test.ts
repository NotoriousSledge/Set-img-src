import {EventProperty, removeSrcByElement} from '../src/index';
describe('removeSrcByElement', function() {
  it('should be able to remove the src of an element', function() {
    const id = 'removeId';
    const removeValue = 'removeValue';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'removeValue';
    document.body.appendChild(imageElement);
    removeSrcByElement(imageElement);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    expect(clonedElement?.src === removeValue).toBeFalsy();
    document.body.removeChild(clonedElement);
  });

  it('should throw an error if the element is null', function() {
    expect( function() {
      const invalidElement = document.getElementById(
          'nullElement') as HTMLImageElement;
      removeSrcByElement(invalidElement);
    } ).toThrow(new Error('removeSrcByElement: Element can not be null'));
  });

  it('should throw an error if element is invalid', function() {
    const invalidElement = document.createElement('div');

    expect( function() {
      removeSrcByElement(invalidElement as HTMLImageElement);
    } ).toThrow(
        new Error(`removeSrcByElement: Element does not have a src attribute`));
  });

  it('should also copy the events of an element', function() {
    function handleClick(event: Event) {
      const self = document.getElementById(
          'eventRemoveElement') as HTMLImageElement;
      self.className = 'removeValue';
    }

    const id = 'eventRemoveElement';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick);

    document.body.appendChild(imageElement);

    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick}];

    removeSrcByElement(imageElement, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    expect(clonedElement.className).toBe('removeValue');
  });

  it('should also copy the events with options of an element', function() {
    function handleClick(event: Event) {
      const self = document.getElementById(
          'optionRemoveElement') as HTMLImageElement;
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

    const id = 'optionRemoveElement';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick, options);

    document.body.appendChild(imageElement);


    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick, Options: options}];

    removeSrcByElement(imageElement, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    clonedElement.click();
    expect(clonedElement.className).toBe('1');
    document.body.removeChild(clonedElement);
  });
});
