/*
* @Author: weijie
* @Date:   2017-09-14 20:38:54
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-15T21:26:00+08:00
*/
import React from 'react';
import './index.css';

class VideoBarrageComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        canSubmit: false,
        opacity: 100,
        fontSize: 24,
        position: 'all',  //all 0,1 top 0,0.3 bottom 0.7,1
        color: '#ff0000'
      }
  }

  componentWillMount() {
  }

  componentDidMount() {
    let { videoSrc } = this.props,
      elVideo = this.refs.video,
      canvas = this.refs.barrage,
      self = this;

    this.refs.video.src = videoSrc;
    this.refs.opacity.value = this.state.opacity;
    this.refs.fontSize.value = this.state.fontSize;
    this.refs.color.value = this.state.color;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    elVideo.addEventListener('play', () => {
      self.isPause = false;
      self.canvasRender();
      // self.addText('2134');
    });
    elVideo.addEventListener('pause', () => {
      self.isPause = true;
    });

    elVideo.addEventListener('seeked', function () {
  		// 跳转播放需要清屏
  		self.reset();
  	});
    // elVideo.addEventListener('seeked', () => {
    //   // 跳转播放需要清屏
    //   top.reset();
    // });
  }

  reset() {
    let canvas = this.refs.barrage,
      video = this.refs.video,
      context = canvas.getContext('2d'),
      canvasWidth = canvas.width,
      canvasHeight = canvas.height,
      time = video.currentTime,
      { barrageList } = this.props;

      // 画布清除
  		context.clearRect(0, 0, canvasWidth, canvasHeight);

      barrageList.forEach(function(barrage) {
        if (barrage) {
  				// 状态变化
  				barrage.disabled = false;
  				// 根据时间判断哪些可以走起
  				if (time < barrage.time) {
  					// 视频时间小于播放时间
  					// barrage.disabled = true;
  					barrage.inited = null;
  				} else {
  					// 视频时间大于播放时间
  					barrage.disabled = true;
  				}
  			}
      });
  }

  clearRect() {
    let canvas = this.refs.barrage,
      context = canvas.getContext('2d'),
      canvasWidth = canvas.width,
      canvasHeight = canvas.height;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.globalAlpha = 1;
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  draw() {
    let time = this.refs.video.currentTime,
      canvas = this.refs.barrage,
      canvasWidth = canvas.width,
      canvasHeight = canvas.height,
      position = this.state.position,
      range,
      context = canvas.getContext('2d'),
      metrics,
      textWidth,
      { barrageList } = this.props;

    if (position === 'all') {
      range = [0, 1];
    } else if (position === 'top') {
      range = [0, 0.3];
    } else if (position === 'bottom') {
      range = [0.7, 1];
    }

    barrageList.forEach((barrage, index) => {
      if (barrage && !barrage.disabled && time >= barrage.time) {
        let fontSize = barrage.fontSize || 24;
        metrics = context.measureText(barrage.value)
        textWidth = metrics.width;

        barrage.speed  = barrage.speed || 0;

        if (barrage.speed) {
  				// 随着字数不同，速度会有微调
  				barrage.speed = barrage.speed + barrage.value.length / 100;
  			}

        if (barrage.isInited) {
          barrage.x -= (barrage.speed + 1.1);
        } else {
          barrage.isInited = true;
          barrage.x = canvasWidth;
          barrage.y = range[0] * canvasHeight + (range[1] - range[0]) * canvasHeight * Math.random();

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
      }
    });
  }

  addText(obj) {
    let canvas = this.refs.barrage;
    let context = canvas.getContext('2d');
    let fontSize = obj.fontSize || '24';
    let fontFace = 'serif';
    let textFillColor = obj.color || 'red';
    let textBaseline = 'middle';
    let textAlign = 'left';
    let fontWeight = 'normal';
    let fontStyle = 'normal';

    // 添加文本
    context.shadowColor = 'rgba(0,0,0,'+ (obj.opacity || this.refs.opacity.value) +')';
  context.shadowBlur = 2;
    context.fillStyle = 'transparent';
    context.textBaseline = textBaseline;
    context.textAlign = textAlign;
    context.font = fontWeight + ' ' + fontStyle + ' ' + fontSize + 'px ' + fontFace;
    context.fillStyle = textFillColor;
    context.fillText(obj.value, obj.x, obj.y);
}

  canvasRender() {
    this.clearRect();
    this.draw();
    if (this.isPause === false) {
      requestAnimationFrame(() => {
        this.canvasRender();
      });
    }
  }

  handleChange(key) {
    // debugger;
    // console.log(this.refs[key].value);
  }

  handleInput(e) {
    let val = e.target.value;

    this.setState({
      canSubmit: !!val
    });
  }

  handleClick(e) {
    let { addBarrage } = this.props;

    e.preventDefault();

    if (addBarrage) {
      addBarrage({
        value: this.refs.value.value,
        time: this.refs.video.currentTime,
        color: this.refs.color.value
      });
    }

    this.refs.value.value = '';
    this.setState({
      canSubmit: false
    });
  }

  render() {
    let position = this.state.position;

    return (
      <div className="video-barrage">
        <canvas ref="barrage"></canvas>
        <video ref="video" width="640" height="384" controls></video>
        <form>
          <p>
            透明度(0-100)：
            <input
              ref="opacity"
              type="range"
              onChange={(e) => this.handleChange('opacity')}
              className="range"
              min="0"
              max="100" />
            文字大小(16-32)：
            <input
              ref="fontSize"
              type="range"
              className="range"
              onChange={(e) => this.handleChange('fontSize')}
              min="16"
              max="32" />
          </p>
          <p>
            弹幕位置：
            <label className="radio-inline">
              <input
                defaultChecked={position === 'all'}
                onChange={(e) => this.handleChange('position')}
                name="position"
                type="radio"
                value="all"
                /> 全部位置
            </label>
            <label className="radio-inline">
              <input
                defaultChecked={position === 'top'}
                onChange={(e) => this.handleChange('position')}
                name="position"
                type="radio"
                value="top"/> 顶部
            </label>
            <label className="radio-inline">
              <input
                defaultChecked={position === 'bottom'}
                onChange={(e) => this.handleChange('position')}
                name="position"
                type="radio"
                value="bottom"/> 底部
            </label>
          </p>
          <p className="last">
            颜色：<input type="color" ref="color" />
            文字：
            <input
              onInput={e => this.handleInput(e)}
              className="ui-input"
              ref="value" required />
            <input
              type="submit"
              value="发送弹幕"
              onClick={e => this.handleClick(e)}
              disabled={!this.state.canSubmit} />
          </p>
        </form>
      </div>
    );
  }
}

VideoBarrageComponent.defaultProps = {
};

export default VideoBarrageComponent;
