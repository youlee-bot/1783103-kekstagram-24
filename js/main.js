import {GenerateComments, CreateDescription} from './utils/mock.js';
import {showAllPictures} from './modules/show-photo.js';
//import {showComments} from './modules/show-big-pick.js';
import './modules/form-handler.js';

//for linter
//checkCommentLength('some text for test', 10);
GenerateComments();
//console.log(CreateDescription());


//insert pictures
showAllPictures(CreateDescription());

//showBigPicture ();
