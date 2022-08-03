import React from 'react';
import ReactDom  from 'react-dom';

export namespace ApiResponseFetcher{
  
  export function fetchApiResponse(word: string, callback: (apiResponse: any)=>void): any{
    fetch('https://bhavyapi.azurewebsites.net/RekhtaDictionary?word='+word)
    .then(
    function(response) {
        if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
            response.status);
        return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
        console.log(data);
          callback(data);
        });
    }
    )
    .catch(function(err) {
    console.log('Fetch Error :-S', err);
    });
  }
}