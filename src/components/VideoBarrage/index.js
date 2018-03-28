/*
* @Author: weijie
* @Date:   2017-09-14 20:38:54
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-16T10:40:21+08:00
*/
import React, { Component, PropTypes } from 'react';
import './index.css';

class VideoBarrageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      opacity: 100,
      fontSize: 24,
      position: 'all', // all 0,1 top 0,0.3 bottom 0.7,1
      color: '#ff0000'
    };
  }

  componentWillMount() {}

  /**
   * [componentDidMount dom加载完毕]
   * @return {[type]} [description]
   */
  componentDidMount() {
    const { videoSrc } = this.props;
    const elVideo = this.video;
    const canvas = this.barrage;
    const self = this;

    // 给视频添加路径，通过父传递进来
    this.video.src = videoSrc;

    // 给canvas重新设置宽高
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // 视频开始播放
    elVideo.addEventListener('play', () => {
      self.isPause = false;
      self.canvasRender();
      // self.addText('2134');
    });

    // 暂停播放
    elVideo.addEventListener('pause', () => {
      self.isPause = true;
    });

    // 拖拽视频
    elVideo.addEventListener('seeked', () => {
      // 跳转播放需要清屏
      self.reset();
    });
  }

  /**
   * [reset 清楚屏，并且更新弹幕是否显示属性]
   */
  reset() {
    const canvas = this.barrage;
    const video = this.video;
    const context = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const time = video.currentTime;
    const { barrageList } = this.props;

    // 画布清除
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    barrageList.forEach((barrage, index) => {
      const newBarrage = barrage;

      if (newBarrage) {
        // 状态变化
        newBarrage.disabled = false;
        // 根据时间判断哪些可以走起
        if (time < newBarrage.time) {
          // 视频时间小于播放时间
          // newBarrage.disabled = true;
          newBarrage.inited = null;
        } else {
          // 视频时间大于播放时间
          newBarrage.disabled = true;
        }

        barrageList[index] = newBarrage;
      }
    });
  }

  /**
   * [clearRect 清空canvas]
   * @return {[type]} [description]
   */
  clearRect() {
    const canvas = this.barrage;
    const context = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.globalAlpha = 1;
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  /**
   * [draw 绘制canvas]
   * @return {[type]} [description]
   */
  draw() {
    const time = this.video.currentTime;
    const canvas = this.barrage;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const position = this.state.position;
    const context = canvas.getContext('2d');
    const {barrageList} = this.props;
    let range;
    let metrics;
    let textWidth;

    if (position === 'all') {
      range = [0, 1];
    } else if (position === 'top') {
      range = [0, 0.3];
    } else if (position === 'bottom') {
      range = [0.7, 1];
    }

    barrageList.forEach((oldBarrage, index) => {
      const barrage = oldBarrage;
      let fontSize;
      let minHeight;
      let randomHeight;

      if (barrage && !barrage.disabled && time >= barrage.time) {
        fontSize = barrage.fontSize || 24;
        metrics = context.measureText(barrage.value);
        textWidth = metrics.width;

        barrage.speed = barrage.speed || 0;

        if (barrage.speed) {
          // 随着字数不同，速度会有微调
          barrage.speed += barrage.value.length / 100;
        }

        if (barrage.isInited) {
          barrage.x -= ((barrage.speed / 10) + 1);
        } else {
          barrage.isInited = true;
          barrage.x = canvasWidth;
          minHeight = range[0] * canvasHeight;
          randomHeight = (range[1] - range[0]) * canvasHeight * Math.random();
          barrage.y = minHeight + randomHeight;

          if (barrage.y < fontSize) {
            barrage.y = fontSize;
          } else if (barrage.y > canvasHeight - fontSize) {
            barrage.y = canvasHeight - fontSize;
          }
        }

        if (barrage.x < -textWidth) {
          barrage.disabled = true;
        } else {
          this.addText(barrage);
        }

        barrageList[index] = barrage;
      }
    });
  }

  /**
   * [addText 给canvas绘制文字]
   * @param {[type]} obj [description]
   */
  addText(obj) {
    const canvas = this.barrage;
    const context = canvas.getContext('2d');
    const fontSize = obj.fontSize || '24';
    const fontFace = 'serif';
    const textFillColor = obj.color || 'red';
    const textBaseline = 'middle';
    const textAlign = 'left';
    const fontWeight = 'normal';
    const fontStyle = 'normal';

    // 添加文本
    context.shadowColor = `rgba(0,0,0,${obj.opacity || this.state.opacity})`;
    context.shadowBlur = 2;
    context.fillStyle = 'transparent';
    context.textBaseline = textBaseline;
    context.textAlign = textAlign;
    context.font = `${fontWeight} ${fontStyle} ${fontSize}px ${fontFace}`;
    context.fillStyle = textFillColor;
    context.fillText(obj.value, obj.x, obj.y);
  }

  /**
   * [canvasRender canvas-一直绘制函数]
   * @return {[type]} [description]
   */
  canvasRender() {
    this.clearRect();
    this.draw();

    // 如果暂停，不用再绘制
    if (this.isPause === false) {
      requestAnimationFrame(() => {
        this.canvasRender();
      });
    }
  }

  /**
   * [handleChange 改变form原生，更新到state]
   * @param  {[type]} e   [description]
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  handleChange(e, key) {
    this.setState({[key]: e.target.value});
    // debugger;
    // console.log(this.refs[key].value);
  }

  /**
   * [handleInput 文平输入控制，1 赋值state 2 更新按钮是否禁用]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  handleInput(e) {
    const val = e.target.value;

    this.setState({value: val});
  }

  /**
   * [handleClick 添加弹幕，调用父方法]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  handleClick(e) {
    const { addBarrage } = this.props;

    e.preventDefault();

    if (addBarrage) {
      addBarrage({
        value: this.state.value,
        time: this.video.currentTime,
        color: this.state.color
      });
    }

    this.setState({value: ''});
  }

  get canSubmit() {
    return !!this.state.value;
  }

  /**
   * [render react 绚烂]
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="video-barrage">
        <canvas ref={(c) => { this.barrage = c; }} />
        <video ref={(c) => { this.video = c; }} width="640" height="384" controls />
        <form>
          <p>
            透明度(0-100)：
            <input ref={(c) => { this.opacity = c; }} type="range" onChange={e => this.handleChange(e, 'opacity')} className="range" value={this.state.opacity} min="0" max="100"/>
            文字大小(16-32)：
            <input ref={(c) => { this.fontSize = c; }} type="range" className="range" value={this.state.fontSize} onChange={e => this.handleChange(e, 'fontSize')} min="16" max="32"/>
          </p>
          <p>
            弹幕位置：
            <label htmlFor className="radio-inline">
              <input checked={this.state.position === 'all'} onChange={e => this.handleChange(e, 'position')} name="position" type="radio" value="all"/>
              全部位置
            </label>
            <label htmlFor className="radio-inline">
              <input checked={this.state.position === 'top'} onChange={e => this.handleChange(e, 'position')} name="position" type="radio" value="top"/>
              顶部
            </label>
            <label htmlFor className="radio-inline">
              <input checked={this.state.position === 'bottom'} onChange={e => this.handleChange(e, 'position')} name="position" type="radio" value="bottom"/>
              底部
            </label>
          </p>
          <p className="last">
            颜色：<input ref={(c) => { this.color = c; }} type="color" value={this.state.color} onChange={e => this.handleChange(e, 'color')}/>
            文字：
            <input ref={(c) => { this.value = c; }} onInput={e => this.handleInput(e)} value={this.state.value} className="ui-input" required/>
            <input type="submit" value="发送弹幕" onClick={e => this.handleClick(e)} disabled={!this.canSubmit}/>
          </p>
        </form>
      </div>
    );
  }
}

VideoBarrageComponent.defaultProps = {};

VideoBarrageComponent.propTypes = {
  videoSrc: PropTypes.string,
  barrageList: PropTypes.array,
  addBarrage: PropTypes.func
};

export default VideoBarrageComponent;
