import React, { Component, useState } from 'react';
import * as Tone from 'tone'
import Board from "./tappr/Board";
import AudioAnalyser from './AudioAnalyser';

class App extends Component {
  constructor() {
    super();
    this.state = {
      audio: null,
      screen: null,
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  resumeAudio(){
    Tone.start();
    console.log('audio resumed');
  }



  render() {

    return (
    <div>
      <div style={{position: "relative"}}>
      <Board/>
      <button onClick={this.resumeAudio}>resume audio</button>
      <button onClick={this.toggleMicrophone}>
          {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
      </button>
      {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
    </div>
   </div>
   );
  }
}

export default App;
