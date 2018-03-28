/*
* @Author: weijie
* @Date:   2017-09-25 15:32:04
* @Last Modified by:   weijie
* @Last Modified time: 2017-09-28 08:50:29
*/

import React, {Component} from 'react';
import './index.less';

const moveSrc = require('./images/move-animated27x40.gif');

class SvgFlipComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const img1 = this.img1;
    const img2 = this.img2;
    const posX = 100; // 希望位置
    const trueX = posX - (27 / 2); // 默认是顶点对齐，改成x轴中心对齐

    img1.setAttribute('x', trueX); // 设置x位置
    img2.setAttribute('x', trueX); // 设置x位置

    img2.setAttribute(
      'transform',
      `translate(${posX * 2},0) scale(-1,1)` // 水平翻转
    );
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="cp-svg-flip">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 523.6 1437.1">
          <image ref={(c) => { this.img1 = c; }} y="0" width="27" height="40" href={moveSrc} />
          <image ref={(c) => { this.img2 = c; }} y="40" width="27" height="40" href={moveSrc} />
        </svg>
      </div>
    );
  }
}

export default SvgFlipComponent;
