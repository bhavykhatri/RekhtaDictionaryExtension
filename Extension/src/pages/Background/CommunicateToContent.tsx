import React from 'react';
import ReactDom  from 'react-dom';
import {ApiResponseFetcher} from './ApiResponseFetcher';

export namespace CommunicateToContent{
  export function sendResponseToContent(apiResponse: any){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if(tabs[0].id){
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", apiResponse: apiResponse}, function(response) {
          console.log(response.farewell);
        });
      }
      
    });
  }

  export function addListenerForReceivingMessage(){
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        var apiResponse = ApiResponseFetcher.fetchApiResponse(request.word, sendResponseToContent);
        console.log("after the call")
        console.log(apiResponse);

        if (request.greeting === "hello"){
          sendResponse({farewell: "goodbye", apiResponse: apiResponse});
        }
          
      }
    );
  }
  

  
}