import React from 'react';
import ReactDom from 'react-dom';
import OriginPOS from './OriginPOS';
import {Utils} from './Utils'
import {WordContainer} from './WordContainer'
import WordMeaning from './WordMeaning';
import LanguageButtonList from './LanguageButtonList';

export namespace MainPopup{

  interface IMainPopupProps{
    input: Utils.IAPIResponse;
  }

  interface IMainPopupStates{
    currLang: string;
  }

  export class MainPopupContainer extends React.Component<IMainPopupProps,IMainPopupStates>{
    constructor(props: IMainPopupProps) {
      super(props);

      this.state = {
        currLang: 'English',
      };      
    }

    render(){
      return(
        <div className='rd-main-popup-container'>
          <WordContainer.WordContainer wordInEnglish={this.props.input.meaningByLanguage['English'].word} 
                                        wordInHindi={this.props.input.meaningByLanguage['Hindi'].word}
                                        wordInUrdu={this.props.input.meaningByLanguage['Urdu'].word}/>

          <OriginPOS.OriginPOSContainer origin={this.props.input.origin}
                                        pos={this.props.input.meaningByLanguage['English'].partOfSpeech}/>

          <WordMeaning.WordMeaningContainer meaningList={this.props.input.meaningByLanguage[this.state.currLang].description}/>
          
          <LanguageButtonList.LanguageButtonListContainer currLang={this.state.currLang}
                                                          updateCurrLang={this.updateCurrentLanguage.bind(this)}/>
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

  }

}

export default MainPopup;
