/*
* @Author: weijie
* @Date:   2017-09-25 11:27:46
* @Last Modified by:   weijie
* @Last Modified time: 2017-09-25 15:15:05
*/

import React, {Component} from 'react';
import SvgFlip from 'components/SvgFlip';

import './index.less';


class SvgFlipComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="pg-svg-flip">
        <SvgFlip />
      </div>
    );
  }
}

export default SvgFlipComponent;
