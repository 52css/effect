/**
 * @Author: weijie
 * @Date:   2017-09-17T07:06:03+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-18T09:52:30+08:00
 */



import React from 'react';

class WebRTCComponent extends React.Component {
  /**
   * [constructor 初始化弹幕]
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  /**
   * [componentDidMount dom加载完毕]
   * @return {[type]} [description]
   */
  componentDidMount() {
    let audioInputSelect = this.refs.audioInputSelect,
      audioOutputSelect = this.refs.audioOutputSelect,
      videoSelect = this.refs.videoSelect;

    audioInputSelect.onchange = this.start;
    audioOutputSelect.onchange = this.changeAudioDestination;
    videoSelect.onchange = this.start;

    navigator
      .mediaDevices
      .enumerateDevices()
      .then(this.gotDevices.bind(this)).catch(this.handleError.bind(this));
    this.start();
  }

  attachSinkId(element, sinkId) {
    let audioOutputSelect = this.refs.audioOutputSelect;

    if (typeof element.sinkId !== 'undefined') {
      element.setSinkId(sinkId)
      .then(function() {
        console.log('Success, audio output device attached: ' + sinkId);
      })
      .catch(function(error) {
        var errorMessage = error;
        if (error.name === 'SecurityError') {
          errorMessage = 'You need to use HTTPS for selecting audio output ' +
              'device: ' + error;
        }
        console.error(errorMessage);
        // Jump back to first output device in the list as it's the default.
        audioOutputSelect.selectedIndex = 0;
      });
    } else {
      console.warn('Browser does not support output device selection.');
    }
  }

  changeAudioDestination() {
    let audioOutputSelect = this.refs.audioOutputSelect,
      videoElement = this.refs.video,
      audioDestination = audioOutputSelect.value;

    this.attachSinkId(videoElement, audioDestination);
  }

  handleError(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  start() {
    let audioInputSelect = this.refs.audioInputSelect,
      videoSelect = this.refs.videoSelect;

    if (window.stream) {
      window.stream.getTracks().forEach(function(track) {
        track.stop();
      });
    }
    var audioSource = audioInputSelect.value;
    var videoSource = videoSelect.value;
    var constraints = {
      audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
      video: {deviceId: videoSource ? {exact: videoSource} : undefined}
    };
    navigator
      .mediaDevices
      .getUserMedia(constraints)
      .then(this.gotStream.bind(this))
      .then(this.gotDevices.bind(this))
      .catch(this.handleError.bind(this));
  }

  gotStream(stream) {
    let videoElement = this.refs.video;

    window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;
    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
  }

  gotDevices(deviceInfos) {
    let audioInputSelect = this.refs.audioInputSelect,
      audioOutputSelect = this.refs.audioOutputSelect,
      videoSelect = this.refs.videoSelect,
      selectors = [audioInputSelect, audioOutputSelect, videoSelect];
    // Handles being called several times to update labels. Preserve values.
    var values = selectors.map(function(select) {
      return select.value;
    });
    selectors.forEach(function(select) {
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
    });
    for (var i = 0; i !== deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      var option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label ||
            'microphone ' + (audioInputSelect.length + 1);
        audioInputSelect.appendChild(option);
      } else if (deviceInfo.kind === 'audiooutput') {
        option.text = deviceInfo.label || 'speaker ' +
            (audioOutputSelect.length + 1);
        audioOutputSelect.appendChild(option);
      } else if (deviceInfo.kind === 'videoinput') {
        option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
        videoSelect.appendChild(option);
      } else {
        console.log('Some other kind of source/device: ', deviceInfo);
      }
    }
    selectors.forEach(function(select, selectorIndex) {
      if (Array.prototype.slice.call(select.childNodes).some(function(n) {
        return n.value === values[selectorIndex];
      })) {
        select.value = values[selectorIndex];
      }
    });
  }

  /**
   * [render react-绚烂]
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="index">
        <div className="select">
          <label htmlFor="audioSource">Audio input source: </label>
          <select ref="audioInputSelect"></select>
        </div>

        <div className="select">
          <label htmlFor="audioOutput">Audio output destination: </label>
          <select ref="audioOutputSelect"></select>
        </div>

        <div className="select">
          <label htmlFor="videoSource">Video source: </label>
          <select ref="videoSelect"></select>
        </div>

        <video ref="video" autoPlay></video>
      </div>
    );
  }
}

WebRTCComponent.defaultProps = {
};

export default WebRTCComponent;
