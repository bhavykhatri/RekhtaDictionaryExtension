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
      var cord = getSelectionCoords(window);
      ReactDom.render(<SearchPopup word={ selection.toString()} 
                          id={Math.floor(Math.random() * (0 - 999999 + 1)) + 999999}
                          xSelectCord={cord.x}
                          ySelectCord={cord.y}/>, document.querySelector(".rd-root-container"));
    }    
  }

  // https://stackoverflow.com/questions/6846230/coordinates-of-selected-text-in-browser-page?noredirect=1&lq=1
  function getSelectionCoords(win: Window) {
    win = win || window;
    var doc: any = win.document;
    var sel = doc.selection, range, rects, rect;
    var x = 0, y = 0;
    if (sel) {
        if (sel.type != "Control") {
            range = sel.createRange();
            range.collapse(true);
            x = range.boundingLeft;
            y = range.boundingTop;
        }
    } else if (win.getSelection) {
        sel = win.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                rects = range.getClientRects();
                if (rects.length > 0) {
                    rect = rects[0];
                }
                x = rect.left ;
                y = rect.top + rect.height;
            }
            // Fall back to inserting a temporary element
            if (x == 0 && y == 0) {
                var span = doc.createElement("span");
                if (span.getClientRects) {
                    // Ensure span has dimensions and position by
                    // adding a zero-width space character
                    span.appendChild( doc.createTextNode("\u200b") );
                    range.insertNode(span);
                    rect = span.getClientRects()[0];
                    x = rect.left ;
                    y = rect.top  + rect.height;
                    var spanParent = span.parentNode;
                    spanParent.removeChild(span);

                    // Glue any broken text nodes back together
                    spanParent.normalize();
                }
            }
        }
    }
    return { x: x, y: y };
}
}