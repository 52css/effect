/**
 * @Author: weijie
 * @Date:   2017-09-17T06:40:35+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-18T09:58:49+08:00
 */



import React from 'react';
import H5PreUploadPreview from 'components/H5PreUploadPreview';

class H5PreUploadPreviewComponent extends React.Component {
  /**
   * [constructor 初始化弹幕]
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  /**
   * [render react-绚烂]
   * @return {[type]} [description]
   */
  render() {
    return (
      <div className="index">
        <h1>h5 上传前预览</h1>
        <H5PreUploadPreview></H5PreUploadPreview>
      </div>
    );
  }
}

H5PreUploadPreviewComponent.defaultProps = {
};

export default H5PreUploadPreviewComponent;
