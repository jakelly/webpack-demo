import _ from 'lodash';
import './style.css';
import printMe from './print.js';

function component() {
  var element = document.createElement('h1');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack', '<br/>'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}


function addNote() {
  var note = document.createElement('div');

  let doc = new DOMParser().parseFromString(
    `But what would happen if we changed the name of one of our 
    entry points, or even added a new one? The generated bundles would 
    be renamed on a build, but our index.html file would still reference 
    the old names. Let's fix that with the HtmlWebpackPlugin`, 'text/html');
  
  note.classList.add('question');
  note.appendChild(doc.body.firstChild);
  return note;
}

document.body.appendChild(component());
document.body.appendChild(addNote());