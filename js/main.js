import {showAllPictures} from './modules/show-photo.js';
import './modules/form-handler.js';
import './modules/show-big-pick.js';
import {getData} from './modules/api.js';
import {showAlert} from './modules/errors.js';

getData(showAllPictures, showAlert);
