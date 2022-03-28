import ImgSrcHandler from './ImgSrcHandler';
import ImgSrcAsyncHandler from './ImgSrcAsyncHandler';
import {setSrcByElement, setSrcById,
  removeSrcByElement, removeSrcById} from './functions';
import {setSrcByElementAsync, setSrcByIdAsync,
  removeSrcByElementAsync, removeSrcByIdAsync} from './asyncFunctions';

export default ImgSrcHandler;

export {
  ImgSrcAsyncHandler, ImgSrcHandler,
  setSrcByElement, setSrcById,
  removeSrcByElement, removeSrcById,
  setSrcByElementAsync, setSrcByIdAsync,
  removeSrcByElementAsync, removeSrcByIdAsync,
};
