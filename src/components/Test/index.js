/**
 * @Author: weijie
 * @Date:   2017-09-15T10:51:35+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-15T10:57:09+08:00
 */



 import React, {Component} from 'react';

 class TestComponent extends Component {
   constructor(props) {
     super(props);
     this.state = {}
   }

   componentDidMount() {}

   componentWillUnmount() {}

   render() {
     return (
       <div className="">
         this is test
       </div>
     );
   }
 }

 export default TestComponent;
