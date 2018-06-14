// import _ from 'lodash';
import './style.css';
import printMe from './print.js';
import { cube } from './math.js';

function component() {
  var element = document.createElement('h1');
  var btn = document.createElement('button');

  // element.innerHTML = _.join(['Hello', 'webpack', '<br/>'], ' ');

  element.innerHTML = ['Hello webpack!', '5 cubed is equal to ' + cube(5) ].join('\n\n');

  // btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = printMe;

  // element.appendChild(btn);

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

let element = component(); // Store the element to re-render on print.js changes
document.body.appendChild(element);
document.body.appendChild(addNote());

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    printMe();
    // document.body.removeChild(element);
    // element = component(); // Re-render the "component" to update the click handler
    // document.body.appendChild(element);
  })
}