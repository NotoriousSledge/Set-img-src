import {EventProperty, setSrcByIdAsync} from '../src/index';
describe('setSrcByIdAsync', async () => {
  it('should be able to change the dataUrl of an element by Id', async () => {
    const id = 'dataUrlIdAsync';
    const imageElement = document.createElement('img');
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'srcValue';
    document.body.appendChild(imageElement);
    await setSrcByIdAsync(id, dataUrl);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    expect(clonedElement?.src).toBe(dataUrl);
    document.body.removeChild(clonedElement);
  });

  it('should be able to change the base64 of an element by Id', async () => {
    const id = 'base64IdAsync';
    const imageElement = document.createElement('img');
    const base64 = `dataURLValue`;
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'srcValue';
    document.body.appendChild(imageElement);
    await setSrcByIdAsync(id, base64);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    expect(clonedElement?.src).toBe(dataUrl);
    document.body.removeChild(clonedElement);
  });

  it('should throw an error if the id is empty', async () => {
    await expectAsync(setSrcByIdAsync('', 'value')).
        toBeRejectedWithError(
            `setSrcByIdAsync: id was empty`);
  });

  it('should throw an error if id is invalid', async () => {
    const id = 'invalidIdAsync';
    await expectAsync(setSrcByIdAsync(id, 'value')).
        toBeRejectedWithError(
            `setSrcByIdAsync: Couldn't get element with id: ${id}`);
  });

  it('should throw an error if element is invalid', async () => {
    const id = 'invalidElementIdAsync';
    const invalidElement = document.createElement('div');
    invalidElement.id = id;
    document.body.appendChild(invalidElement);
    await expectAsync(setSrcByIdAsync(id, 'value')).
        toBeRejectedWithError(
            `setSrcByIdAsync: ${id} does not have a src attribute`);
  });

  it('should throw an error if value is empty', async () => {
    const id = 'emptyValueIdAsync';
    const imageElement = document.createElement('img');
    imageElement.id = id;
    imageElement.src = 'srcValue';
    document.body.appendChild(imageElement);

    await expectAsync(setSrcByIdAsync(id, '')).
        toBeRejectedWithError(`setSrcByIdAsync: value was empty`);
  });

  it('should also copy the events of an element', async () => {
    function handleClick(event: Event) {
      const self = document.getElementById('idEventAsync') as HTMLImageElement;
      const currentClass = self.className;
      if (!currentClass) {
        self.className = '1';
      } else if (currentClass) {
        const num = Number.parseInt(currentClass);
        self.className = `${num + 1}`;
      }
    }

    const id = 'idEventAsync';
    const imageElement = document.createElement('img');
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick);

    document.body.appendChild(imageElement);

    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick}];

    await setSrcByIdAsync(id, dataUrl, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    clonedElement.click();
    expect(clonedElement.className).toBe('2');
    document.body.removeChild(clonedElement);
  });

  it('should also copy the events with options of an element', async () => {
    function handleClick(event: Event) {
      const self = document.getElementById('idOptionAsync') as HTMLImageElement;
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

    const id = 'idOptionAsync';
    const imageElement = document.createElement('img');
    const dataUrl = `data:image/jpeg;base64,dataURLValue`;
    imageElement.id = id;
    imageElement.src = 'image';
    imageElement.addEventListener('click', handleClick, options);

    document.body.appendChild(imageElement);


    const eventProps: EventProperty[] =
    [{Event: 'click', Listener: handleClick, Options: options}];

    await setSrcByIdAsync(id, dataUrl, eventProps);

    const clonedElement = document.getElementById(id) as HTMLImageElement;
    clonedElement.click();
    clonedElement.click();
    expect(clonedElement.className).toBe('1');
    document.body.removeChild(clonedElement);
  });
});
