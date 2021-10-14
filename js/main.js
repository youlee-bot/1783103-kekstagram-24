import {getRandomInt, checkCommentLength, GenerateComments, CreateDescription} from './utils/functions.js';
import {showAllPictures} from './modules/show-photo.js';

//for linter
checkCommentLength('some text for test', 10);
getRandomInt();
GenerateComments();
//console.log(CreateDescription());

//insert pictures
showAllPictures(CreateDescription());
