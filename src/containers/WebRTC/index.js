/**
 * @Author: weijie
 * @Date:   2017-09-17T07:06:03+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-18T22:40:31+08:00
 */

import React, { Component } from 'react';

class WebRTCComponent extends Component {
  /**
   * [constructor 初始化弹幕]
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  /**
   * [componentDidMount dom加载完毕]
   * @return {[type]} [description]
   */
  componentDidMount() {
    const audioInputSelect = this.audioInputSelect;
    const audioOutputSelect = this.audioOutputSelect;
    const videoSelect = this.videoSelect;

    audioInputSelect.onchange = this.start;
    audioOutputSelect.onchange = this.changeAudioDestination;
    videoSelect.onchange = this.start;

    // 取所有设备
    navigator
      .mediaDevices
      .enumerateDevices()
      .then(this.gotDevices.bind(this)).catch(this.handleError.bind(this));
    this.start();
  }

  /**
   * [attachSinkId 检查视频]
   * @param  {[type]} element [description]
   * @param  {[type]} sinkId  [description]
   * @return {[type]}         [description]
   */
  attachSinkId(element, sinkId) {
    const audioOutputSelect = this.audioOutputSelect;

    if (typeof element.sinkId !== 'undefined') {
      element.setSinkId(sinkId)
      .then(() => {
        console.log(`Success, audio output device attached: ${sinkId}`);
      })
      .catch((error) => {
        let errorMessage = error;
        if (error.name === 'SecurityError') {
          errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
        }
        console.error(errorMessage);
        // Jump back to first output device in the list as it's the default.
        audioOutputSelect.selectedIndex = 0;
      });
    } else {
      console.warn('Browser does not support output device selection.');
    }
  }

  /**
   * [changeAudioDestination 改变视频源]
   * @return {[type]} [description]
   */
  changeAudioDestination() {
    const audioOutputSelect = this.audioOutputSelect;
    const videoElement = this.video;
    const audioDestination = audioOutputSelect.value;

    this.attachSinkId(videoElement, audioDestination);
  }

  /**
   * [handleError 处理异常]
   * @param  {[type]} error [description]
   * @return {[type]}       [description]
   */
  handleError(error) {
    console.log(`navigator.getUserMedia error: ${error}`);
  }

  /**
   * [start 开始后重新获取视频流]
   * @return {[type]} [description]
   */
  start() {
    const audioInputSelect = this.audioInputSelect;
    const videoSelect = this.videoSelect;

    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    const audioSource = audioInputSelect.value;
    const videoSource = videoSelect.value;
    const constraints = {
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

  /**
   * [gotStream 获取视频流]
   * @param  {[type]} stream [description]
   * @return {[type]}        [description]
   */
  gotStream(stream) {
    const videoElement = this.video;

    window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;
    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
  }

  /**
   * [gotDevices 获取所有设备]
   * @param  {[type]} deviceInfos [description]
   * @return {[type]}             [description]
   */
  gotDevices(deviceInfos) {
    const audioInputSelect = this.audioInputSelect;
    const audioOutputSelect = this.audioOutputSelect;
    const videoSelect = this.videoSelect;
    const selectors = [audioInputSelect, audioOutputSelect, videoSelect];
    // Handles being called several times to update labels. Preserve values.
    const values = selectors.map((select) => {
      const newSelect = select;

      return newSelect.value;
    });
    selectors.forEach((select) => {
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
    });
    for (let i = 0; i !== deviceInfos.length; i += 1) {
      const deviceInfo = deviceInfos[i];
      const option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label ||
          `microphone ${audioInputSelect.length + 1}`;
        audioInputSelect.appendChild(option);
      } else if (deviceInfo.kind === 'audiooutput') {
        option.text = deviceInfo.label ||
          `speaker ${audioOutputSelect.length + 1}`;
        audioOutputSelect.appendChild(option);
      } else if (deviceInfo.kind === 'videoinput') {
        option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
        videoSelect.appendChild(option);
      } else {
        console.log(`Some other kind of source/device: ${deviceInfo}`);
      }
    }
    selectors.forEach((oldSelect, selectorIndex) => {
      const select = oldSelect;

      if (Array.prototype.slice.call(select.childNodes).some((oldN) => {
        const n = oldN;

        return n.value === values[selectorIndex];
      })) {
        select.value = values[selectorIndex];
      }

      selectors[selectorIndex] = select;
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
          <select ref={(c) => { this.audioInputSelect = c; }} />
        </div>

        <div className="select">
          <label htmlFor="audioOutput">Audio output destination: </label>
          <select ref={(c) => { this.audioOutputSelect = c; }} />
        </div>

        <div className="select">
          <label htmlFor="videoSource">Video source: </label>
          <select ref={(c) => { this.videoSelect = c; }} />
        </div>

        <video ref={(c) => { this.video = c; }} autoPlay />
      </div>
    );
  }
}

WebRTCComponent.defaultProps = {
};

export default WebRTCComponent;
