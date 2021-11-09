import './modules/form-handler.js';
import './modules/show-big-pick.js';
import {getData, contentDataArray} from './modules/api.js';
import {showAlert} from './modules/errors.js';
import './modules/filter-elements.js';
import {filterElements} from './modules/filter-elements.js';

getData(() => {
  filterElements(contentDataArray);
  document.querySelector('#filter-default').click();
}, showAlert);

// сделать фильтры вывода фотографий
