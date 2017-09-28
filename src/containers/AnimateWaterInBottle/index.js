/**
 * @Author: weijie
 * @Date:   2017-09-17T13:12:56+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-17T13:18:07+08:00
 */
 import React from 'react';
 import AnimateWaterInBottle from 'components/AnimateWaterInBottle';

 class AnimateWaterInBottleComponent extends React.Component {
   /**
    * [constructor 初始化弹幕]
    * @param  {[type]} props [description]
    * @return {[type]}       [description]
    */
   constructor(props) {
     super(props);
     this.state = {
     };
   }


   /**
    * [render react-绚烂]
    * @return {[type]} [description]
    */
   render() {
     return (
       <div className="index">
         <AnimateWaterInBottle />
       </div>
     );
   }
 }

 AnimateWaterInBottleComponent.defaultProps = {
 };

 export default AnimateWaterInBottleComponent;
