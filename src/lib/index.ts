import ImgSrcHandler from './ImgSrcHandler';
import {setSrcByElementBase64, setSrcByElementDataUrl,
  setSrcByIdBase64, setSrcByIdDataUrl,
  removeSrcByElement, removeSrcById,
  setSrcByElementBase64Async, setSrcByElementDataUrlAsync,
  setSrcByIdBase64Async, setSrcByIdDataUrlAsync,
  removeSrcByElementAsync, removeSrcByIdAsync,
} from './functions';
import ImgSrcAsyncHandler from './ImgSrcAsyncHandler';

export default ImgSrcHandler;

export {
  setSrcByElementBase64, setSrcByIdBase64,
  setSrcByElementDataUrl, setSrcByIdDataUrl,
  removeSrcByElement, removeSrcById,
  ImgSrcAsyncHandler, ImgSrcHandler,
  setSrcByElementBase64Async, setSrcByElementDataUrlAsync,
  setSrcByIdBase64Async, setSrcByIdDataUrlAsync,
  removeSrcByIdAsync, removeSrcByElementAsync,
};
