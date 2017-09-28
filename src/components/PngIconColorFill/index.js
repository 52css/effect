/**
 * @Author: weijie
 * @Date:   2017-09-18T10:49:52+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-18T13:40:30+08:00
 */

import React, { Component, PropTypes } from 'react';

import './index.less';

class PngIconColorFillComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const {color} = this.props;
    const iconStyle = {
      filter: `drop-shadow(20px 0 ${color})`
    };

    return (
      <div className="cp-png-icon-color-fill">
        <i className="icon">
          <i className="icon icon-del" style={iconStyle} />
        </i>
      </div>
    );
  }
}

PngIconColorFillComponent.propTypes = {
  color: PropTypes.string
};

export default PngIconColorFillComponent;
