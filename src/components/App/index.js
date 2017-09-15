/**
 * @Author: weijie
 * @Date:   2017-09-15T09:48:11+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-15T10:56:22+08:00
 */


 import React, {Component} from 'react';
 import Header from 'components/Header';
 import Main from 'components/Main';

 require('normalize.css/normalize.css');
 require('styles/App.css');

 class AppComponent extends Component {
   constructor(props) {
     super(props);
     this.state = {}
   }

   componentDidMount() {}

   componentWillUnmount() {}

   render() {
     return (
       <div className="">
         <Header />
         <Main />
       </div>
     );
   }
 }

 export default AppComponent;
