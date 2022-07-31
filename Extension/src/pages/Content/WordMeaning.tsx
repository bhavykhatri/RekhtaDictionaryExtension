import React from 'react';
import ReactDom from 'react-dom';

export namespace WordMeaning{

  interface IWordMeaningContainerProps{
    meaningList: string[];
  }

  interface IWordMeaningContainerStates{

  }

  export class WordMeaningContainer extends React.Component<IWordMeaningContainerProps,IWordMeaningContainerStates>{
    constructor(props: IWordMeaningContainerProps) {
      super(props);
    }

    render(){
      return(
        <div className = "word-meaning-container">
          {this.props.meaningList.map((v, i) =>(
              <div key={i} className="word-meaning-item">
                <div className='dot'>
                  <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2.5" cy="2.5" r="2" stroke="#ADADAD"/>
                  </svg>
                </div>  
                <div className='meaning'>
                  {v}
                </div>
              </div>
            ))}
        </div>
      );
    }

  }

}

export default WordMeaning;
