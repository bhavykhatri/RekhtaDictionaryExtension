import React from 'react';
import ReactDom from 'react-dom';

export namespace LanguageButtonList{

  interface ILanguageButtonListContainerProps{
    currLang: string;
    updateCurrLang: (newLang: string) => void;
    availableLang: string[];
  }

  interface ILanguageButtonListContainerStates{

  }

  export class LanguageButtonListContainer extends React.Component<ILanguageButtonListContainerProps,ILanguageButtonListContainerStates>{
    constructor(props: ILanguageButtonListContainerProps) {
      super(props);
    }

    render(){
      return(
        <div className = "lang-button-list-container">
          {this.props.availableLang.map(
            (v, i) => (
              <LanguageButtonItem key={i} selected={v === this.props.currLang} language={v} updateCurrLang={this.updateCurrLang.bind(this, v)}/>
            )
          )}
        </div>
      );
    }
    updateCurrLang(newLang: string){
      this.props.updateCurrLang(newLang);
    }
  }

  export class LanguageButtonItem extends React.Component<any,any>{
    constructor(props: any) {
      super(props);
    }

    render(){
      return(
        <div key={this.props.key} className = {"lang-button-item" + (this.props.selected? ' selected': '') + " " + this.props.language}  onClick={this.updateCurrLang.bind(this, this.props.language)}>
          {(this.props.language == 'English'? 'English' : this.props.language == 'Hindi'? 'हिन्दी ' : 'اردو' )}
        </div>
      );
    }

    updateCurrLang(newLang: string){
      this.props.updateCurrLang(newLang);
    }
    
  }

}

export default LanguageButtonList;
