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
