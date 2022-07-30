import { printLine } from './modules/print';
import {SearchPopup} from './SearchPopup';
import React from 'react';
import { render } from 'react-dom';
import SearchIcon from './SearchIcon';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

var rootContainer = document.createElement("div");
rootContainer.className = "rd-root-container";
document.body.appendChild(rootContainer);

// render(<SearchPopup word="Khuddar"/>, document.body);
render(<SearchPopup word="Khuddar" />, document.querySelector(".rd-root-container"));