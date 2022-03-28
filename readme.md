Set-Img-Src
========
### [Github](https://github.com/exsjabe/Set-Img-Src.git)


![GitHub](https://img.shields.io/github/license/exsjabe/set-img-src)
[![CodeFactor](https://www.codefactor.io/repository/github/exsjabe/set-img-src/badge/master)](https://www.codefactor.io/repository/github/exsjabe/set-img-src/overview/master)
![npm bundle size](https://img.shields.io/bundlephobia/min/set-img-src)
![GitHub top language](https://img.shields.io/github/languages/top/exsjabe/set-img-src)
![Code Style](https://img.shields.io/badge/Code%20Style-google-blueviolet)


## Table of contents
- [Set-Img-Src](#set-img-src)
    - [Github](#github)
  - [Table of contents](#table-of-contents)
  - [General info](#general-info)
  - [Technologies](#technologies)
  - [Setup](#setup)
  - [Documentation](#documentation)
  - [All Exports](#all-exports)

## General info
Set-img-src is aimed at solving [a browser bug](#https://stackoverflow.com/questions/19298393/setting-img-src-to-dataurl-leaks-memory) where changing the src attribute of an image between dataURLs or base64-strings causes RAM spikes.
The bug has been marked as fixed in Chromium however people have reported it despite that and I myself recently encountered it as well.
Essentially all this project does is taking [this solution](https://github.com/quru/image-defer/issues/2) of using cloneNode, adding a parameter for moving eventListeners as well, and then putting it in a package so it can be easily moved between projects.



	
## Technologies
Project is created with:
* Typescript version: 4.6
	
## Setup
To run this project, install it locally using npm:

```
$ npm install set-img-src
```

## Documentation
Set-img-src's default export is a class with static functions for setting src by Id or Element.
The passed value can be either formatted as a base64-string or a dataUrl.
```ts
import ImgSrcHandler from 'set-img-src'
...
function ById(id: string, value: string) {
    ImgSrcHandler.setSrcById(id, value);
}

function byElement(id: string, value: string) {
    element = document.getElementById(id);
    ImgSrcHandler.setSrcByElement(element, value);
}
```
If your element has event listeners attached to it you will have to pass these through the 'eventProperties' parameter as Node.cloneNode does not copy them automatically.

```ts
import ImgSrcHandler from 'set-img-src'
...
function setWithEvents(id: string, value: string) {
    ImgSrcHandler.setSrcById(id, value, {Event: 'click', Listener: handleClick});
}

```
There is also a class with static async functions that returns promises if that is more to your liking.

```ts
import {ImgSrcAsyncHandler} from 'set-img-src'
...
function asyncById(id: string, value: string) {
    ImgSrcAsyncHandler.setSrcById(id, value).then(() => {
        console.log('Completed!')
    })
}
```
You can also import functions one by one,

```ts
import {setSrcById, removeSrcById} from 'set-img-src'
...
function ById(id: string, value: string) {
    setSrcById(id, string);
}

function remove(id) {
    removeSrcById(id);
}
```
Which also goes for async functions.

```ts
import {setSrcByIdAsync} from 'set-img-src'
...
function asyncById(id: string, value: string) {
    setSrcByIdAsync(id, string).then(() => {
        console.log('Completed!');
    })
}
```

## All Exports
```ts
default class ImgSrcHandler {
    static setSrcById(id: string, value: string, eventProperties?: EventProperty[]): void;
    static removeSrcById(id: string, eventProperties?: EventProperty[]): void;
    static setSrcByElement(image: HTMLImageElement, value: string, eventProperties?: EventProperty[]): void;
    static removeSrcByElement(image: HTMLImageElement, eventProperties?: EventProperty[]): void;
}

class ImgSrcAsyncHandler {
    static setSrcById(id: string, value: string, eventProperties?: EventProperty[]): Promise<void>;
    static removeSrcById(id: string, eventProperties?: EventProperty[]): Promise<void>;
    static setSrcByElement(image: HTMLImageElement, value: string, eventProperties?: EventProperty[]): Promise<void>;
    static removeSrcByElement(image: HTMLImageElement, eventProperties?: EventProperty[]): Promise<void>;
}

function setSrcById(id: string, value: string, eventProperties?: EventProperty[]): void;

function removeSrcById(id: string, eventProperties?: EventProperty[]): void;

function setSrcByElement(image: HTMLImageElement, value: string, eventProperties?: EventProperty[]): void;

function removeSrcByElement(image: HTMLImageElement, eventProperties?: EventProperty[]): void;

function setSrcByIdAsync(id: string, value: string, eventProperties?: EventProperty[]): Promise<void>;

function removeSrcByIdAsync(id: string, eventProperties?: EventProperty[]): Promise<void>;

function setSrcByElementAsync(image: HTMLImageElement, value: string, eventProperties?: EventProperty[]): Promise<void>;

function removeSrcByElementAsync(image: HTMLImageElement, eventProperties?: EventProperty[]): Promise<void>;

interface EventProperty {
    Event: string;
    Listener: EventListenerOrEventListenerObject;
    Options?: boolean | AddEventListenerOptions | undefined;
}
```