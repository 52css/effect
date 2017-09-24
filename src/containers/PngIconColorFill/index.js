/**
 * @Author: weijie
 * @Date:   2017-09-18T10:45:52+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-18T13:40:13+08:00
 */



 import React, {Component} from 'react';
 import PngIconColorFill from 'components/PngIconColorFill';

 import './index.less';


 class PngIconColorFillComponent extends Component {
   constructor(props) {
     super(props);
     this.state = {}
   }

   componentDidMount() {}

   componentWillUnmount() {}

   render() {
     return (
       <div className="pg-png-icon-color-fill">
         <p><strong>原始图标</strong></p>
         <i className="icon icon-del"></i>
         <p><strong>可以变色的图标</strong></p>
         <PngIconColorFill color={'red'} />
         <PngIconColorFill color={'green'} />
         <PngIconColorFill color={'blue'} />
       </div>
     );
   }
 }

 export default PngIconColorFillComponent;
