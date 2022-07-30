import SearchIcon from './SearchIcon';
import React from 'react';
import './SearchPopup.scss';

interface Props{
    word: string;
}

export class SearchPopup extends React.Component<Props, any>{
  render(){
    return (
      <div className='rd-search-popup'>
        <SearchIcon />
        <div className='rd-popup-text'>
          Search "{this.props.word}" from Rekhta
        </div>
      </div>

    );
  }
}

export default SearchPopup;
