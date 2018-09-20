import React, { Component } from 'react';
import Button, { ButtonToVoice, RoundButton } from '../Buttons';
import MediaRecorder from 'audio-recorder-polyfill'; // to make MediaRecorder available in Safari

import './ListenYourselfExerciseItem.css';

function Task({ text }) {
  return <span className="listen-yourself-task">{text}</span>;
}

class ListenYourselfExerciseItem extends Component {
  state = {
    isRecording: false,
    isPlaying: false,
    blob: null,
    step: 'read',
  };

  recorder = null;

  startRecording = () => {
    this.setState({ isRecording: true, isPlaying: false });
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.recorder = new MediaRecorder(stream);
      this.recorder.addEventListener('dataavailable', e => {
        const blob = e.data;
        this.setState({ blob });
      });
      this.recorder.start();
    });
  };

  goToStep = step => {
    this.setState({ step });
  };

  stopRecording = () => {
    this.setState({ isRecording: false, isPlaying: false });
    if (this.recorder) {
      this.recorder.stop();
      // Remove “recording” icon from browser tab
      this.recorder.stream.getTracks().forEach(i => i.stop());
      if (this.state.step !== 'finish') {
        this.goToStep('listen_to_yourself');
      }
    }
  };

  playRecording = () => {
    const { blob } = this.state;
    this.setState({ isPlaying: true });
    if (blob) {
      const audio = new Audio(URL.createObjectURL(blob));
      audio.play();
      this.goToStep('finish');
    }
  };

  render() {
    const { question } = this.props;
    const { step } = this.state;
    const isCurrentStep = chosenStep => {
      return step === chosenStep;
    };
    return (
      <div className="listen-yourself">
        <React.Fragment>
          {isCurrentStep('read') ? <Task text="Read the text:" /> : null}
          <div className="listen-yourself-text">{question.text}</div>
          {isCurrentStep('read') ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 25,
              }}
            >
              <Button title="Next" onClick={() => this.goToStep('listen')} />
            </div>
          ) : null}
        </React.Fragment>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
            transition: '0.5s all',
          }}
        >
          {isCurrentStep('record') ||
          isCurrentStep('listen_to_yourself') ||
          isCurrentStep('finish') ? (
            <ButtonToVoice text={question.text} />
          ) : null}
          {isCurrentStep('listen_to_yourself') || isCurrentStep('finish') ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginLeft: 30,
                transition: '0.5s all',
              }}
            >
              <div style={{ marginRight: 5 }}>
                <RoundButton
                  onClick={this.startRecording}
                  record
                  active={this.state.isRecording}
                />
              </div>

              <div style={{ marginRight: 5 }}>
                <RoundButton onClick={this.stopRecording} stop />
              </div>
            </div>
          ) : null}
          {isCurrentStep('finish') ? (
            <React.Fragment>
              <RoundButton
                onClick={this.playRecording}
                play
                active={this.state.isPlaying}
              />
            </React.Fragment>
          ) : null}
        </div>
        {isCurrentStep('listen') ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Task text="Listen to the text:" />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ButtonToVoice text={question.text} />
            </div>
            {isCurrentStep('listen') ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 25,
                }}
              >
                <Button title="Next" onClick={() => this.goToStep('record')} />
              </div>
            ) : null}
          </div>
        ) : null}

        {isCurrentStep('record') ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Task text="Read the text aloud (first start to record):" />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <RoundButton
                onClick={this.startRecording}
                record
                active={this.state.isRecording}
              />
              {this.state.isRecording ? (
                <div style={{ marginLeft: 5 }}>
                  <RoundButton onClick={this.stopRecording} stop />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {isCurrentStep('listen_to_yourself') ? (
          <React.Fragment>
            <Task text="Listen yourself:" />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <RoundButton
                onClick={this.playRecording}
                play
                active={this.state.isPlaying}
              />
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default ListenYourselfExerciseItem;
