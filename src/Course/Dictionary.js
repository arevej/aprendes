import React, { Component } from 'react';
import './Dictionary.css';

import { ButtonToVoice, Button } from '../Buttons';
import { getInfinitive } from '../dictionary';

const DICTIONARY_WIDTH = 430;
let id = 1;

function DictionaryItem({
  word,
  translation,
  onChangeWord,
  onChangeTranslation,
  type,
}) {
  return (
    <div className="dictionary-item">
      <ButtonToVoice text={word} size={28} />
      <textarea
        type="text"
        className="dictionary-item-word"
        value={word}
        rows={1}
        onChange={onChangeWord}
      />
      <textarea
        type="text"
        className="dictionary-item-translation"
        value={translation}
        rows={1}
        onChange={onChangeTranslation}
      />
    </div>
  );
}

function NewDictionaryItemForm({
  word,
  translation,
  onChangeWord,
  onChangeTranslation,
  onSubmit,
  type,
  wordPlaceHolder,
  translationPlaceHolder,
}) {
  return (
    <form onKeyDown={onSubmit} className="new-dictionary-item">
      <textarea
        type="text"
        className="dictionary-item-word"
        value={word}
        placeholder={wordPlaceHolder}
        rows={1}
        onChange={onChangeWord}
      />
      <textarea
        type="text"
        className="dictionary-item-translation"
        value={translation}
        placeholder={translationPlaceHolder}
        rows={1}
        onChange={onChangeTranslation}
      />
    </form>
  );
}

class Dictionary extends Component {
  state = {
    dictionaryList: [
      { id: id++, word: 'gato', translation: 'cat' },
      { id: id++, word: 'manzana', translation: 'apple' },
      { id: id++, word: 'casa', translation: 'house' },
      { id: id++, word: 'madrugada', translation: 'early morning' },
    ],
    newWord: '',
    newTranslation: '',
  };

  handleChange = (id, evt, type) => {
    if (type === 'word') {
      const newList = this.state.dictionaryList.map(
        item => (item.id === id ? { ...item, word: evt.target.value } : item),
      );
      this.setState({ dictionaryList: newList });
    } else if (type === 'translation') {
      const newList = this.state.dictionaryList.map(
        item =>
          item.id === id ? { ...item, translation: evt.target.value } : item,
      );
      this.setState({ dictionaryList: newList });
    } else {
      const newList = this.state.dictionaryList.filter(
        item => item.word != '' && item.translation != '',
      );
      this.setState({ dictionaryList: newList });
    }
  };

  handleChangeNewDictionaryItem = (evt, type) => {
    if (type === 'newWord') {
      this.setState({ newWord: evt.target.value });
    } else if (type === 'newTranslation') {
      this.setState({ newTranslation: evt.target.value });
    }
  };

  addNewDictionaryItem = evt => {
    if (
      this.state.newWord != '' &&
      this.state.newTranslation != '' &&
      evt.keyCode == 13 &&
      evt.shiftKey == false
    ) {
      evt.preventDefault();
      this.setState({
        dictionaryList: [
          {
            id: id++,
            word: this.state.newWord,
            translation: this.state.newTranslation,
          },
          ...this.state.dictionaryList,
        ],
        newWord: '',
        newTranslation: '',
      });
    }
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
        <div className="dictionary-list">
          <NewDictionaryItemForm
            word={this.state.newWord}
            translation={this.state.newTranslation}
            wordPlaceHolder="Word"
            translationPlaceHolder="Translation"
            onChangeWord={evt =>
              this.handleChangeNewDictionaryItem(evt, 'newWord')
            }
            onChangeTranslation={evt =>
              this.handleChangeNewDictionaryItem(evt, 'newTranslation')
            }
            onSubmit={evt => this.addNewDictionaryItem(evt)}
          />
          <Button title="Add a new word" onClick={this.addNewDictionaryItem} />
          <div style={{ marginTop: 20 }}>
            {this.state.dictionaryList.map(item => (
              <DictionaryItem
                key={item.id}
                word={item.word}
                translation={item.translation}
                onChangeWord={evt => this.handleChange(item.id, evt, 'word')}
                onChangeTranslation={evt =>
                  this.handleChange(item.id, evt, 'translation')
                }
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Dictionary;
