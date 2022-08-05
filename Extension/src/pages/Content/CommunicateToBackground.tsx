import React from 'react';
import ReactDom  from 'react-dom';
import {SearchPopup} from './SearchPopup';
import {MainPopup} from './MainPopup';
import {Utils} from './Utils';

export namespace CommunicateToBackground{
  export function sendMessageToBackground(word: string){
    

    chrome.runtime.sendMessage({greeting: "hello", word: word}, function(response) {
      
    });
  }  

  export function addListenerForReceivingMessage(){
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        
        
        
        ReactDom.render(<MainPopup.MainPopupContainer input={request.apiResponse} />, document.querySelector(".rd-root-container"));

        if (request.greeting === "hello")
          sendResponse({farewell: "goodbye"});
      }
    );
  }
}