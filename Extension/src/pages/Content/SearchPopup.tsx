import SearchIcon from './SearchIcon';
import React from 'react';
import './SearchPopup.scss';
import ReactDom  from 'react-dom';

interface Props{
    word: string;
    id: number;
    xSelectCord: number;
    ySelectCord:number;
}

interface State{
  show: boolean;
}
export class SearchPopup extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    
    this.state = {
      show: true,
    }; 
     
  }

  componentDidUpdate(prevProps: Props) {
    if(this.props.id !== prevProps.id) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.setState(
        {
          show: true,
        }
      );
    }
  } 

  componentDidMount(){
    document.addEventListener("click", this.removePopupWhenClickedOutside.bind(this));
  }

  componentWillUnmount(){
    document.removeEventListener("click", this.removePopupWhenClickedOutside.bind(this));
  }

  removePopupWhenClickedOutside(event: any){

    if(document && !document.querySelector(".rd-root-container")?.contains(event.target)) {
      var elem: HTMLElement | null = document.querySelector(".rd-root-container");

      var selection;
    
      var doc: any = document;
      if (window.getSelection) {
        selection = window.getSelection();
      } else if (doc.selection) {
        selection = doc.selection.createRange();
      }

      
      if(elem && selection.toString() !== this.props.word){

        this.setState(
          {
            show: false
          }
        );

      }
              
    }
  }

  render(){

    if(!this.state.show){
      return null;
    }

    return (
      <div className='rd-search-popup' style={{left: this.props.xSelectCord, top: this.props.ySelectCord}}>
        <SearchIcon />
        <div className='rd-popup-text'>
          Search "{this.props.word}" from Rekhta
        </div>
      </div>

    );
  }
}

export default SearchPopup;
