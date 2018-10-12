/*
* @Author: weijie
* @Date:   2018-03-28 21:31:06
 * @Last Modified by: weijie
 * @Last Modified time: 2018-10-12 11:36:43
*/
import React, {Component} from 'react';
import PicToBase64 from 'components/PicToBase64';

import './index.less';


class PicToBase64Component extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="pg-pic-to-base64">
        <PicToBase64 />
      </div>
    );
  }
}

export default PicToBase64Component;
