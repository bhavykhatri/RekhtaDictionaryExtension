import React from 'react';
import ReactDom from 'react-dom';
import OriginPOS from './OriginPOS';
import {Utils} from './Utils'
import {WordContainer} from './WordContainer'
import WordMeaning from './WordMeaning';
import LanguageButtonList from './LanguageButtonList';
import './MainPopup.scss';
import { useEffect, useRef } from 'react';

export namespace MainPopup{

  interface IMainPopupProps{
    input: Utils.IAPIResponse;
  }

  interface IMainPopupStates{
    currLang: string;
    showPopup: boolean;
  }

  export class MainPopupContainer extends React.Component<IMainPopupProps,IMainPopupStates>{
    
    constructor(props: IMainPopupProps) {
      super(props);

      this.state = {
        currLang: 'English',
        showPopup: true,
      };      
    }

    render(){
      if(!this.state.showPopup){
        return null;
      }

      return(
        <div   className='rd-main-popup-container'>
          <WordContainer.WordContainer wordInEnglish={this.props.input.meaningByLanguage['English'].word} 
                                        wordInHindi={this.props.input.meaningByLanguage['Hindi'].word}
                                        wordInUrdu={this.props.input.meaningByLanguage['Urdu'].word}/>

          <OriginPOS.OriginPOSContainer origin={this.props.input.origin}
                                        pos={this.props.input.meaningByLanguage['English'].partOfSpeech}/>

          <WordMeaning.WordMeaningContainer meaningList={this.props.input.meaningByLanguage[this.state.currLang].description}/>
          
          <LanguageButtonList.LanguageButtonListContainer currLang={this.state.currLang}
                                                          updateCurrLang={this.updateCurrentLanguage.bind(this)}/>

          <Close show={true} onClose={this.onClose.bind(this)}/>
        </div>
      );
    }

    updateCurrentLanguage(newLang: string){
      this.setState(
        {
          currLang: newLang,
        }
      );
    }

    onClose = () => {
      this.setState(
        {
          showPopup: false,
        }
      );
    }

    
  }

  class Close extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        const closeStyle : {} = {
            position: 'absolute',
            top: '32px',
            right: '20px',
            cursor: 'pointer'
        };

        return (
            <div className="rd-close-button"
                onClick={this.onClose.bind(this)}
                style={closeStyle}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.969 6.969C7.03867 6.89915 7.12143 6.84374 7.21255 6.80593C7.30366 6.76812 7.40135 6.74866 7.5 6.74866C7.59865 6.74866 7.69633 6.76812 7.78745 6.80593C7.87857 6.84374 7.96133 6.89915 8.031 6.969L12 10.9395L15.969 6.969C16.0387 6.89927 16.1215 6.84395 16.2126 6.80621C16.3037 6.76847 16.4014 6.74905 16.5 6.74905C16.5986 6.74905 16.6963 6.76847 16.7874 6.80621C16.8785 6.84395 16.9613 6.89927 17.031 6.969C17.1007 7.03873 17.156 7.12151 17.1938 7.21262C17.2315 7.30373 17.2509 7.40138 17.2509 7.5C17.2509 7.59861 17.2315 7.69626 17.1938 7.78737C17.156 7.87848 17.1007 7.96127 17.031 8.031L13.0605 12L17.031 15.969C17.1007 16.0387 17.156 16.1215 17.1938 16.2126C17.2315 16.3037 17.2509 16.4014 17.2509 16.5C17.2509 16.5986 17.2315 16.6963 17.1938 16.7874C17.156 16.8785 17.1007 16.9613 17.031 17.031C16.9613 17.1007 16.8785 17.156 16.7874 17.1938C16.6963 17.2315 16.5986 17.2509 16.5 17.2509C16.4014 17.2509 16.3037 17.2315 16.2126 17.1938C16.1215 17.156 16.0387 17.1007 15.969 17.031L12 13.0605L8.031 17.031C7.96127 17.1007 7.87848 17.156 7.78737 17.1938C7.69626 17.2315 7.59861 17.2509 7.5 17.2509C7.40138 17.2509 7.30373 17.2315 7.21262 17.1938C7.12151 17.156 7.03873 17.1007 6.969 17.031C6.89927 16.9613 6.84395 16.8785 6.80621 16.7874C6.76847 16.6963 6.74905 16.5986 6.74905 16.5C6.74905 16.4014 6.76847 16.3037 6.80621 16.2126C6.84395 16.1215 6.89927 16.0387 6.969 15.969L10.9395 12L6.969 8.031C6.89915 7.96133 6.84374 7.87857 6.80593 7.78745C6.76812 7.69633 6.74866 7.59865 6.74866 7.5C6.74866 7.40135 6.76812 7.30366 6.80593 7.21255C6.84374 7.12143 6.89915 7.03867 6.969 6.969Z" fill="black"/>
                </svg>

            </div>
        );
    }

    onClose() {
        this.props.onClose();
    }
  }
}

export default MainPopup;
