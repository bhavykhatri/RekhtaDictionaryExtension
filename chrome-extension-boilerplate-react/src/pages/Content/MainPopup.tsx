import React from 'react';
import ReactDom from 'react-dom';
import {Utils} from './Utils'

namespace MainPopup{

  interface IMainPopupProps{
    input: Utils.IAPIResponse;
  }

  interface IMainPopupStates{

  }

  export class MainPopup extends React.Component<IMainPopupProps,IMainPopupStates>{
    constructor(props: IMainPopupProps) {
      super(props);
    }


  }

}

export default MainPopup;
