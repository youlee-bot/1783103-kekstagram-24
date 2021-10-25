import {GenerateComments, contentDataArray} from './utils/mock.js';
import {showAllPictures} from './modules/show-photo.js';
//import {showComments} from './modules/show-big-pick.js';
import './modules/form-handler.js';
import './modules/show-big-pick.js';

//for linter
//checkCommentLength('some text for test', 10);
GenerateComments();
//console.log(CreateDescription());
//console.log(contentDataArray);

//insert pictures


showAllPictures(contentDataArray);


//showBigPicture ();
