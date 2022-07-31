import React from 'react';
import ReactDom from 'react-dom';

export namespace WordContainer{

  interface IWordContainerProps{
    wordInEnglish: string;
    wordInHindi: string;
    wordInUrdu: string;
  }

  interface IWordContainerStates{

  }

  export class WordContainer extends React.Component<IWordContainerProps,IWordContainerStates>{
    constructor(props: IWordContainerProps) {
      super(props);
    }

    render(){
      return(
        <div className = "original-word-container">
          <div className='word english'>
            {this.props.wordInEnglish}
          </div>
          <div className='urdu-hindi-word-layer'>
            <div className='word hindi'>
              {this.props.wordInHindi}
            </div>

            <div className='dot'>
              <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#ADADAD"/>
              </svg>
            </div>

            <div className='word urdu'>
              {this.props.wordInUrdu}
            </div>
          </div>
      </div>
      );
    }

  }

}

export default WordContainer;
