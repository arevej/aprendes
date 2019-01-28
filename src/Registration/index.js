import React, { Component } from 'react';
import { Redirect } from 'react-router';

import Header from '../Header';
import Chat from './Chat';

import './index.css';

let id = 1;

class RegistrationForm extends Component {
  state = {
    dialog: [
      {
        id: id++,
        text: 'Hola, me llamo Esgato. What is your name?',
        sender: 'bot',
      },
    ],
    profileInfo: {
      name: '',
      email: '',
    },
    stage: 'name',
  };

  sendMessage = message => {
    const { profileInfo, dialog, stage } = this.state;
    const isMessageEmpty = message === '';
    const emailValidation = /\S+@\S+\.\S+/;
    const isEmailValid = emailValidation.test(message);

    let messageTimeout = 0;
    const sendFromBot = text => {
      messageTimeout += 1000;
      setTimeout(() => {
        this.setState(state => ({
          dialog: [
            ...state.dialog,
            {
              id: id++,
              text: text,
              sender: 'bot',
            },
          ],
        }));
      }, messageTimeout);
    };

    const updateProfile = withItems => {
      this.setState(state => ({
        profileInfo: { ...profileInfo, ...withItems },
      }));
    };

    const newMessageItem = {
      id: id++,
      text: message,
      sender: 'user',
    };
    if (!isMessageEmpty) {
      this.setState(state => ({
        dialog: [...state.dialog, newMessageItem],
      }));
    }
    console.log(profileInfo);

    if (stage === 'name') {
      updateProfile({ name: message });
      sendFromBot('Qué nombre bonito!');
      sendFromBot(`${message}, please, tell me your email address`);
      this.setState({ stage: 'email' });
    } else if (stage === 'email') {
      if (isEmailValid) {
        updateProfile({ email: message });
        sendFromBot('Gracias!');
        sendFromBot(
          'We are almost done. Lets make sure all information is correct.',
        );
        sendFromBot(`Your name is ${profileInfo.name}, right?`);
        this.setState({ stage: 'check name' });
      } else {
        sendFromBot(
          'It looks like you send an invalid email. Por favor, try again.',
        );
      }
    } else if (stage === 'check name') {
      if (message.toLowerCase() === 'yes') {
        sendFromBot(`Great, ${profileInfo.name}!`);
        sendFromBot(
          `Now we should check your email. Is your email ${profileInfo.email}?`,
        );
        this.setState({ stage: 'check email' });
      } else if (message.toLowerCase() === 'no') {
        sendFromBot('So, cómo te llamas?');
        this.setState({ stage: 'change name' });
      } else {
        sendFromBot('Just tell me yes or no.');
      }
    } else if (stage === 'change name') {
      updateProfile({ name: message });
      sendFromBot(`Great, ${message}!`);
      sendFromBot(
        `Now we should check your email. Is your email ${profileInfo.email}?`,
      );
      this.setState({ stage: 'check email' });
    } else if (stage === 'check email') {
      if (message.toLowerCase() === 'yes') {
        sendFromBot(`We are done. Gracias!!`);
        setTimeout(() => {
          this.setState({ stage: 'done' });
        }, 1000);
      } else if (message.toLowerCase() === 'no') {
        sendFromBot('Por favor, tell me your email.');
        this.setState({ stage: 'change email' });
      } else {
        sendFromBot('Just tell me yes or no.');
      }
    } else if (stage === 'change email') {
      if (isEmailValid) {
        updateProfile({ email: message });
        sendFromBot('We are done. Gracias!');
        setTimeout(() => {
          this.setState({ stage: 'done' });
        }, 1000);
      } else {
        sendFromBot(
          'It looks like you send an invalid email. Por favor, try again.',
        );
      }
    }
  };

  render() {
    if (this.state.stage === 'done') {
      return <Redirect to="/course" />;
    }
    return (
      <div className="registrationForm">
        <Header />
        <div className="registrationForm-greeting">
          <h1 className="registrationForm-greeting-header">
            Lets know each other
          </h1>
          <h3 className="registrationForm-greeting-text">
            Hola, my name is Esgato. I am here to help your learn Español.
          </h3>
        </div>
        <Chat messages={this.state.dialog} onSend={this.sendMessage} />
      </div>
    );
  }
}

export default RegistrationForm;
