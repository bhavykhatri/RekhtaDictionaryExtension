import React from 'react';
import ReactDom  from 'react-dom';
import {SearchPopup} from './SearchPopup';
import {MainPopup} from './MainPopup';
import {Utils} from './Utils';

export namespace CommunicateToBackground{
  export function sendMessageToBackground(word: string){
    
    console.log("sendMessageToBackground: " + word);
    console.log("make backend script call");
    chrome.runtime.sendMessage({greeting: "hello", word: word}, function(response) {
      console.log(response.farewell);
      console.log(response.apiResponse);
    });
  }  

  export function addListenerForReceivingMessage(){
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        
        console.log(request);
        
        ReactDom.render(<MainPopup.MainPopupContainer input={request.apiResponse} />, document.querySelector(".rd-root-container"));

        if (request.greeting === "hello")
          sendResponse({farewell: "goodbye"});
      }
    );
  }
}