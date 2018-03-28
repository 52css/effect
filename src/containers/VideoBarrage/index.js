/**
 * @Author: weijie
 * @Date:   2017-09-15T13:50:13+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-15T21:11:44+08:00
 */

import React from 'react';
import VideoBarrage from 'components/VideoBarrage';

const videoSrc = require('./images/video.mp4');

class VideoBarrageComponent extends React.Component {
  /**
    * [constructor 初始化弹幕]
    * @param  {[type]} props [description]
    * @return {[type]}       [description]
    */
  constructor(props) {
    super(props);
    this.state = {
      barrageList: [
        {
          value: 'speed设为0为非滚动',
          time: 1, // 单位秒
          speed: 0
        }, {
          value: 'time控制弹幕时间，单位秒',
          color: 'blue',
          time: 2,
          speed: 2
        }, {
          value: '视频共21秒',
          time: 3.2,
          speed: 3
        }, {
          value: '视频背景为白色',
          time: 4.5
        }, {
          value: '视频为录制',
          time: 5.0
        }, {
          value: '视频内容简单',
          time: 6.3
        }, {
          value: '是为了让视频尺寸不至于过大',
          time: 7.8
        }, {
          value: '省流量',
          time: 8.5
        }, {
          value: '支持弹幕暂停（视频暂停）',
          time: 9
        }, {
          value: 'add()方法新增弹幕',
          time: 11
        }, {
          value: 'reset()方法重置弹幕',
          time: 11
        }, {
          value: '颜色，字号，透明度可全局设置',
          time: 13
        }, {
          value: '具体交互细节可参考页面源代码',
          time: 14
        }, {
          value: '内容不错哦！',
          time: 18,
          color: 'yellow'
        }
      ]
    };
  }

  /**
    * [handleAddBarrage 添加弹幕]
    * @param  {[type]} obj [description]
    * @return {[type]}     [description]
    */
  handleAddBarrage(obj) {
    const barrageList = this.state.barrageList;

    barrageList.push(obj);

    this.setState({barrageList});
  }

  /**
    * [render react-绚烂]
    * @return {[type]} [description]
    */
  render() {

    return (
      <div className="index">
        {this.state.barrageList.length}
        <VideoBarrage
          videoSrc={videoSrc}
          barrageList={this.state.barrageList}
          addBarrage={obj => this.handleAddBarrage(obj)}/>
      </div>
    );
  }
}

VideoBarrageComponent.defaultProps = {};

export default VideoBarrageComponent;
