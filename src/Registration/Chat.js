import React, { Component } from 'react';

import { Button } from '../Buttons';
import { TiImage } from 'react-icons/ti';

import cat from '../img/cat.png';

import './Chat.css';

function Message({ text, sender }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
      }}
    >
      <div
        style={{
          background: sender === 'user' ? 'red' : 'yellow',
          borderBottomLeftRadius: sender === 'user' ? 10 : 0,
          borderBottomRightRadius: sender === 'user' ? 0 : 10,
          marginLeft: sender === 'user' ? 50 : 20,
          marginRight: sender === 'user' ? 20 : 50,
        }}
        className="message"
      >
        {text}
      </div>
    </div>
  );
}

class Chat extends Component {
  state = {
    message: '',
  };

  _bottomOfChat = null;

  scrollToBottom = () => {
    this._bottomOfChat.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleChange = evt => {
    this.setState({ message: evt.target.value });
  };

  handleSend = () => {
    const message = this.state.message.trim();
    if (message == '') return;
    this.props.onSend(message);
    this.setState({ message: '' });
  };

  render() {
    const { messages } = this.props;
    return (
      <div className="chat" ref="chat">
        <div className="chat-header">
          <img src={cat} height="50px" alt="" className="chat-header-avatar" />
          <span className="chat-header-name">Esgato</span>
        </div>
        <div className="chat-messages">
          {messages.map(item => (
            <Message key={item.id} text={item.text} sender={item.sender} />
          ))}
          <div ref={node => (this._bottomOfChat = node)} />
        </div>
        <div
          className="chat-composer"
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <input
            className="chat-composer-textInput"
            type="text"
            placeholder="Text message"
            onChange={this.handleChange}
            onKeyDown={evt => (evt.keyCode === 13 ? this.handleSend() : null)}
            value={this.state.message}
          />
          <input
            type="file"
            name="file"
            id="file"
            className="chat-composer-imageInput"
          />
          <label for="file" className="chat-composer-label">
            <TiImage size={25} />
          </label>
          <Button title="Send" onClick={this.handleSend} />
        </div>
      </div>
    );
  }
}

export default Chat;
