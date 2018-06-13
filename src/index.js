import _ from 'lodash';
import './style.css';
import Logo from './logo.svg';

function component() {
  var element = document.createElement('h1');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack!'], ' ');
  element.classList.add('hello');

  // Add the logo
  var myLogo = new Image(200);
  myLogo.classList.add('logo');
  myLogo.src = Logo;

  element.appendChild(myLogo);

  return element;
}

document.body.appendChild(component());