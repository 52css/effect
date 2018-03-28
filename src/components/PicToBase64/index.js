/*
* @Author: weijie
* @Date:   2018-03-28 21:31:27
* @Last Modified by:   weijie
* @Last Modified time: 2018-03-29 06:16:25
*/
import React, {Component} from 'react';
import './index.less';
import picToBase64 from '../../services/picToBase64';

class PicToBase64Component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowUrl: 'http://osgames1.b0.upaiyun.com/tangide/publish/upyun/osgames1/881426575864292/osgames1.b0.upaiyun.com/tangide/publish/upyun/genius/961422350843654/cantk-game/assets/images/64.png',
      notArrowUrl: 'http://osgames1.b0.upaiyun.com/tangide/publish/upyun/osgames1/881426575864292/cantk-game/assets/images/trans-anim.png',
      arrowBase64Url: '',
      notArrowBase64Url: ''
    };
  }

  componentDidMount() {
    Promise.all([
      picToBase64(this.state.arrowUrl),
      picToBase64(this.state.notArrowUrl)
    ]).then((res) => {
      const arrowBase64Url = res[0];
      const notArrowBase64Url = res[1];

      this.setState({
        arrowBase64Url,
        notArrowBase64Url
      });
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="cp-pic-to-base64">
        <h3>允许跨域</h3>
        <img src={this.state.arrowUrl} alt="允许跨域"/>
        <h3>不允许跨域</h3>
        <img src={this.state.notArrowUrl} alt="不允许跨域"/>
        <h3>base64允许跨域</h3>
        <img src={this.state.arrowBase64Url} alt="base64允许跨域"/>
        <h3>base64不允许跨域</h3>
        <img src={this.state.notArrowBase64Url} alt="base64不允许跨域"/>
      </div>
    );
  }
}

export default PicToBase64Component;
