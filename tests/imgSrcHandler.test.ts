import {EventProperty, ImgSrcHandler} from '../src/index';
describe('ImgSrcHandler', function() {
  it('should be able to change the dataUrl of an element during setSrcById',
      function() {
        const id = 'dataUrlIdHandler';
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

  it('should be able to change the base64 of an element during setSrcById',
      function() {
        const id = 'base64IdHandler';
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

  it('should throw an error if the id is empty during setSrcById', function() {
    expect( function() {
      ImgSrcHandler.setSrcById('', 'value');
    } ).toThrow(new Error('setSrcById: id was empty'));
  });

  it('should throw an error if id is invalid during setSrcById', function() {
    const id = 'invalidIdHandler';
    expect( function() {
      ImgSrcHandler.setSrcById(id, 'value');
    } ).toThrow(
        new Error(`setSrcById: Couldn't get element with id: ${id}`));
  });

  it('should throw an error if element is invalid during setSrcById',
      function() {
        const id = 'invalidElementIdHandler';
        const invalidElement = document.createElement('div');
        invalidElement.id = id;
        document.body.appendChild(invalidElement);
        expect( function() {
          ImgSrcHandler.setSrcById(id, 'value');
        } ).toThrow(
            new Error(`setSrcById: ${id} does not have a src attribute`));
      });

  it('should throw an error if value is empty during setSrcById',
      function() {
        const id = 'emptyValueIdHandler';
        const imageElement = document.createElement('img');
        imageElement.id = id;
        imageElement.src = 'srcValue';
        document.body.appendChild(imageElement);

        expect( function() {
          ImgSrcHandler.setSrcById(id, '');
        } ).toThrow(
            new Error(`setSrcById: value was empty`));
      });

  it('should also copy the events of an element during setSrcById',
      function() {
        function handleClick(event: Event) {
          const self = document.getElementById(
              'idEventHandler') as HTMLImageElement;
          const currentClass = self.className;
          if (!currentClass) {
            self.className = '1';
          } else if (currentClass) {
            const num = Number.parseInt(currentClass);
            self.className = `${num + 1}`;
          }
        }

        const id = 'idEventHandler';
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

  it('should also copy the events with options of an element during setSrcById',
      function() {
        function handleClick(event: Event) {
          const self = document.getElementById(
              'idOptionHandler') as HTMLImageElement;
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

        const id = 'idOptionHandler';
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

  it('should be able to change the dataUrl of element during setSrcByElement',
      function() {
        const id = 'dataUrlElementHandler';
        const dataImage = document.createElement('img');
        const dataUrl = `data:image/jpeg;base64,dataURLValue`;
        dataImage.id = id;
        dataImage.src = 'srcValue';
        document.body.appendChild(dataImage);
        ImgSrcHandler.setSrcByElement(dataImage, dataUrl);

        const clonedElement = document.getElementById(id) as HTMLImageElement;
        expect(clonedElement?.src).toBe(dataUrl);
        document.body.removeChild(clonedElement);
      });

  it('should be able to change the base64 of an element during setSrcByElement',
      function() {
        const id = 'base64ElementHandler';
        const imageElement = document.createElement('img');
        const base64 = `dataURLValue`;
        const dataUrl = `data:image/jpeg;base64,dataURLValue`;
        imageElement.id = id;
        imageElement.src = 'srcValue';
        document.body.appendChild(imageElement);
        ImgSrcHandler.setSrcByElement(imageElement, base64);

        const clonedElement = document.getElementById(id) as HTMLImageElement;
        expect(clonedElement?.src).toBe(dataUrl);
        document.body.removeChild(clonedElement);
      });

  it('should throw an error if the element is null during setSrcByElement',
      function() {
        expect( function() {
          const nullElement = document.getElementById(
              'null') as HTMLImageElement;
          ImgSrcHandler.setSrcByElement(nullElement, 'value');
        } ).toThrow(new Error('setSrcByElement: Element can not be null'));
      });

  it('should throw an error if element is invalid during setSrcByElement',
      function() {
        const id = 'invalidElementHandler';
        const invalidElement = document.createElement('div');
        invalidElement.id = id;
        document.body.appendChild(invalidElement);
        expect( function() {
          ImgSrcHandler.setSrcByElement(
              invalidElement as HTMLImageElement, 'value');
        } ).toThrow(
            new Error(`setSrcByElement: Element does not have a src attribute`),
        );
      });

  it('should throw an error if value is empty during setSrcByElement',
      function() {
        const id = 'emptyValueElementHandler';
        const imageElement = document.createElement('img');
        imageElement.id = id;
        imageElement.src = 'srcValue';
        document.body.appendChild(imageElement);

        expect( function() {
          ImgSrcHandler.setSrcByElement(imageElement, '');
        } ).toThrow(
            new Error(`setSrcByElement: value was empty`));
      });

  it('should also copy the events of an element during setSrcByElement',
      function() {
        function handleClick(event: Event) {
          const self = document.getElementById(
              'elementEventHandler') as HTMLImageElement;
          self.className = 'eventValue';
        }

        const id = 'elementEventHandler';
        const imageElement = document.createElement('img');
        const dataUrl = `data:image/jpeg;base64,dataURLValue`;
        imageElement.id = id;
        imageElement.src = 'image';
        imageElement.addEventListener('click', handleClick);

        document.body.appendChild(imageElement);

        const eventProps: EventProperty[] =
        [{Event: 'click', Listener: handleClick}];

        ImgSrcHandler.setSrcByElement(imageElement, dataUrl, eventProps);

        const clonedElement = document.getElementById(id) as HTMLImageElement;
        clonedElement.click();
        expect(clonedElement.className).toBe('eventValue');
        document.body.removeChild(clonedElement);
      });

  it('should also copy the eventoptions of an element during setSrcByElement',
      function() {
        function handleClick(event: Event) {
          const self = document.getElementById(
              'elementOptionHandler') as HTMLImageElement;
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

        const id = 'elementOptionHandler';
        const imageElement = document.createElement('img');
        const dataUrl = `data:image/jpeg;base64,dataURLValue`;
        imageElement.id = id;
        imageElement.src = 'image';
        imageElement.addEventListener('click', handleClick, options);

        document.body.appendChild(imageElement);


        const eventProps: EventProperty[] =
        [{Event: 'click', Listener: handleClick, Options: options}];

        ImgSrcHandler.setSrcByElement(imageElement, dataUrl, eventProps);

        const clonedElement = document.getElementById(id) as HTMLImageElement;
        clonedElement.click();
        clonedElement.click();
        expect(clonedElement.className).toBe('1');
        document.body.removeChild(clonedElement);
      });
  it('should be able to remove the src of an element during removeSrcById',
      function() {
        const id = 'RemoveIdHandler';
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

  it('should throw an error if the id is empty during removeSrcById',
      function() {
        expect( function() {
          ImgSrcHandler.removeSrcById('');
        } ).toThrow(new Error('removeSrcById: id was empty'));
      });

  it('should throw an error if id is invalid during removeSrcById', function() {
    const id = 'invalidIdRemoveIdHandler';
    expect( function() {
      ImgSrcHandler.removeSrcById(id);
    } ).toThrow(
        new Error(`removeSrcById: Couldn't get element with id: ${id}`));
  });

  it('should throw an error if element is invalid during removeSrcById',
      function() {
        const id = 'invalidElementRemoveIdHandler';
        const invalidElement = document.createElement('div');
        invalidElement.id = id;
        document.body.appendChild(invalidElement);
        expect( function() {
          ImgSrcHandler.removeSrcById(id);
        } ).toThrow(
            new Error(`removeSrcById: ${id} does not have a src attribute`));
      });

  it('should also copy the events of an element during removeSrcById',
      function() {
        function handleClick(event: Event) {
          const self = document
              .getElementById('eventRemoveIdHandler') as HTMLImageElement;
          self.className = 'removeValue';
        }

        const id = 'eventRemoveIdHandler';
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

  it('should also copy the eventoptions of an element during removeSrcById',
      function() {
        function handleClick(event: Event) {
          const self = document.getElementById(
              'optionRemoveIdHandler') as HTMLImageElement;
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

        const id = 'optionRemoveIdHandler';
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

  it('should be able to remove the src of an element during removeSrcByElement',
      function() {
        const id = 'removeId';
        const removeValue = 'removeValue';
        const imageElement = document.createElement('img');
        imageElement.id = id;
        imageElement.src = 'removeValue';
        document.body.appendChild(imageElement);
        ImgSrcHandler.removeSrcByElement(imageElement);

        const clonedElement = document.getElementById(id) as HTMLImageElement;
        expect(clonedElement?.src === removeValue).toBeFalsy();
        document.body.removeChild(clonedElement);
      });

  it('should throw an error if the element is null during removeSrcByElement',
      function() {
        expect( function() {
          const invalidElement = document.getElementById(
              'nullElement') as HTMLImageElement;
          ImgSrcHandler.removeSrcByElement(invalidElement);
        } ).toThrow(new Error('removeSrcByElement: Element can not be null'));
      });

  it('should throw an error if element is invalid', function() {
    const invalidElement = document.createElement('div');

    expect( function() {
      ImgSrcHandler.removeSrcByElement(invalidElement as HTMLImageElement);
    } ).toThrow(
        new Error(`removeSrcByElement: Element does not have a src attribute`));
  });

  it('should also copy the events of an element during removeSrcByElement',
      function() {
        function handleClick(event: Event) {
          const self = document.getElementById(
              'eventRemoveElementHandler') as HTMLImageElement;
          self.className = 'removeValue';
        }

        const id = 'eventRemoveElementHandler';
        const imageElement = document.createElement('img');
        imageElement.id = id;
        imageElement.src = 'image';
        imageElement.addEventListener('click', handleClick);

        document.body.appendChild(imageElement);

        const eventProps: EventProperty[] =
        [{Event: 'click', Listener: handleClick}];

        ImgSrcHandler.removeSrcByElement(imageElement, eventProps);

        const clonedElement = document.getElementById(id) as HTMLImageElement;
        clonedElement.click();
        expect(clonedElement.className).toBe('removeValue');
      });

  it('should also copy the eventoptions of element during removeSrcByElement',
      function() {
        function handleClick(event: Event) {
          const self = document.getElementById(
              'optionRemoveElementHandler') as HTMLImageElement;
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

        const id = 'optionRemoveElementHandler';
        const imageElement = document.createElement('img');
        imageElement.id = id;
        imageElement.src = 'image';
        imageElement.addEventListener('click', handleClick, options);

        document.body.appendChild(imageElement);


        const eventProps: EventProperty[] =
        [{Event: 'click', Listener: handleClick, Options: options}];

        ImgSrcHandler.removeSrcByElement(imageElement, eventProps);

        const clonedElement = document.getElementById(id) as HTMLImageElement;
        clonedElement.click();
        clonedElement.click();
        expect(clonedElement.className).toBe('1');
        document.body.removeChild(clonedElement);
      });
});
