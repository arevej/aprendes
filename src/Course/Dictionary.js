import React, { Component } from 'react';
import './Dictionary.css';

const DICTIONARY_WIDTH = 450;

class Dictionary extends Component {
  state = {
    dictionaryList: [
      { word: 'gato', translation: 'cat' },
      { word: 'manzana', translation: 'apple' },
      { word: 'casa', translation: 'house' },
      { word: 'madrugada', translation: 'early morning' },
    ],
  };

  render() {
    return (
      <div
        className="dictionary"
        style={{
          marginRight: this.props.isDictionaryOpen ? -DICTIONARY_WIDTH : 0,
          width: DICTIONARY_WIDTH,
        }}
      >
        {this.state.dictionaryList.map(item => (
          <div className="dictionary-list">
            <span className="dictionary-list-word">{item.word}</span>
            <span className="dictionary-list-translation">
              {item.translation}
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Dictionary;
