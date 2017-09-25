/**
 * @Author: weijie
 * @Date:   2017-09-18T10:49:52+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-18T13:40:30+08:00
 */

 import './index.less';

 import React, {Component} from 'react';


 class PngIconColorFillComponent extends Component {
   constructor(props) {
     super(props);
     this.state = {}
   }

   componentDidMount() {}

   componentWillUnmount() {}

   render() {
     let { color } = this.props,
       iconStyle = {
         filter: 'drop-shadow(20px 0 ' + color + ')'
       };

     return (
       <div className="cp-png-icon-color-fill">
         <i className="icon"><i className="icon icon-del" style={iconStyle}></i></i>
       </div>
     );
   }
 }

 export default PngIconColorFillComponent;
