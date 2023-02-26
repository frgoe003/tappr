import React, { Component } from 'react';
import AudioVisualiser from './AudioVisualiser';

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.state = { audioData: new Uint8Array(0) };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
  }

   detectClap() {
    var t = (new Date()).getTime();
    var data = Array.from(this.state['audioData']);
    console.log(data)
    var zeroCrossings = 0, highAmp = 0;
    for(var i = 1; i < data.length; i++){
      if(Math.abs(data[i]) > 150) {
        highAmp++
      } // TWEAK HERE
      if((data[i] > 0 && data[i-1] < 0) || (data[i] < 0 && data[i-1] > 0)){
        zeroCrossings++
      }
    }
    console.log(highAmp,zeroCrossings)
    if(highAmp > 1 && zeroCrossings > 1){ // TWEAK HERE (20,30)
      return true;
    }
    return false;
  }


  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
    console.log(this.detectClap());
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  render() {
    return <AudioVisualiser audioData={this.state.audioData} />;
  }
}

export default AudioAnalyser;
