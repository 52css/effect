/**
 * @Author: weijie
 * @Date:   2017-09-17T13:18:22+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-18T09:28:58+08:00
 */
import React from 'react';
import './index.less';

const bottleSrc = require('./images/bottle.png');

class AnimateWaterInBottle extends React.Component {
  /**
    * [constructor 初始化弹幕]
    * @param  {[type]} props [description]
    * @return {[type]}       [description]
    */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
    * [render react-绚烂]
    * @return {[type]} [description]
    */
  render() {
    const svgStyle = `
       .st0{fill:#FFFFFF;}
     `;

    return (
      <div className="index">
        <div className="bottle-wrap">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 523.6 1437.1">
            <style type="text/css">
              {
                svgStyle
              }</style>
            <title>瓶子</title>
            <clipPath id="clipPath">
              <path className="st0" d="M501.8,1227.1c-26.6-64.6-20.1-133.6-10.2-199.7c9.9-66.1,22.6-175,20.4-184.3c-2.2-9.3-5.9-8.2,0-41
                      c5.9-32.8-3.6-185.1-10.2-204.8s-15.2-24.5-15.3-41c-1.3-33.2-69.3-209.7-84.5-259.3s-11.5-106.8-11-124c21.4-23.4,20.7-38.5,18-57
                      s-13.8-34.9-1-43s18.5-50.8-27.9-62c-8.9-2.1-71.2-9.8-90.1-10L252,0h-5.5h-4.8L202,1.1c-21.1,0.2-58.9,5.7-67.2,10
                      c-31.7,16.8-29.5,41.5-20.8,54c20.7,29.4,3,32.4,0.3,50.9s-1,33,20.5,56.3c0.5,17.3,5.1,73.3-10.3,122.9s-85.9,228-87.2,261.1
                      c-0.1,16.5-8.7,21.3-15.4,41s-16.2,172-10.3,204.8c5.9,32.8,2.2,31.6,0,41c-2.2,9.4,10.5,118.2,20.5,184.3
                      c10,66.1,16.5,135.1-10.3,199.7s-29.6,125.3-5.1,189.4c3.5,9.4,13.6,13.2,30.8,15.4c15.5,1.9,172.1,4.5,199.3,5v0.1h2.8h2.3v-0.1
                      c23.7-0.4,162.9-2.1,192.7-5c17.1-1.7,58.7-5.9,62.2-15.4C531.3,1352.5,528.4,1291.7,501.8,1227.1z"/>
            </clipPath>
          </svg>
          <div className="water-wrap">
            <div className="water" />
          </div>
          <img src={bottleSrc} alt="bottle" className="bottle"/>
        </div>
      </div>
    );
  }
}

AnimateWaterInBottle.defaultProps = {};

export default AnimateWaterInBottle;
