import {SearchPopup} from './SearchPopup';
import React from 'react';
import { render } from 'react-dom';
import {Utils} from './Utils';
import {MainPopup} from './MainPopup';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

var rootContainer = document.createElement("div");
rootContainer.className = "rd-root-container";
document.body.appendChild(rootContainer);
const response = {"origin":"Arabic","vazn":"121","meaningByLanguage":{"English":{"partOfSpeech":[" Noun, Masculine"],"description":["coward","wasteland","cowardly, pusillanimous, timid"], "word": "jabaan"},"Hindi":{"partOfSpeech":[" संज्ञा, पुल्लिंग"],"description":["डरपोक","वीराना","बुज़दिल, थड़दला (कायर )"], "word": "जबान"},"Urdu":{"partOfSpeech":[" اسم, مذکر"],"description":["ڈرپوک","ویران جگہ","بزدل ، تھڑدلا"], "word": "جَبان"}}};

document.onclick = function(e) {
    if(!document.querySelector(".rd-root-container").contains(e.target)) {
        var elem = document.querySelector(".rd-root-container");
        elem.style.display = "none";
    }
  }

// render(<SearchPopup word="Khuddar"/>, document.body);
render(<MainPopup.MainPopupContainer input={response}/>, document.querySelector(".rd-root-container"));

Utils.ResponseProcessor(response);