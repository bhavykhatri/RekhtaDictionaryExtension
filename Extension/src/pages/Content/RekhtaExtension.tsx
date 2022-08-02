import React from 'react';
import ReactDom  from 'react-dom';
import {SearchPopup} from './SearchPopup';

export namespace RekhtaExtension{


  export function selectTextEventListener(){
    console.log("slect event listner added");
    document.body.addEventListener('mouseup', showSearchBoxPopup);
  }

  function showSearchBoxPopup(event: any){
    var selection;
    
    var doc: any = document;
    if (window.getSelection) {
      selection = window.getSelection();
    } else if (doc.selection) {
      selection = doc.selection.createRange();
    }
    
    if(selection.toString() !== '')
    {
      
      ReactDom.render(<SearchPopup word={ selection.toString()} id={Math.floor(Math.random() * (0 - 999999 + 1)) + 999999}/>, document.querySelector(".rd-root-container"));
    }    
  }
}