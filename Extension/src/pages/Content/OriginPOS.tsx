import React from 'react';
import ReactDom from 'react-dom';

export namespace OriginPOS{

  interface IOriginPOSContainerProps{
    origin: string;
    pos: string[];
  }

  interface IOriginPOSContainerStates{

  }

  export class OriginPOSContainer extends React.Component<IOriginPOSContainerProps,IOriginPOSContainerStates>{
    constructor(props: IOriginPOSContainerProps) {
      super(props);
    }

    render(){
      return(
        <div className = "origin-pos-container">
          <div className='origin'>
            {this.props.origin}
          </div>
          <div className='pos'>
            {this.props.pos.map((v, i) =>(
              <li key={i}> {v} </li>
            ))}
          </div>
      </div>
      );
    }

  }

}

export default OriginPOS;
