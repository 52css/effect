/**
 * @Author: weijie
 * @Date:   2017-09-15T11:21:03+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: App.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-15T11:21:53+08:00
 */



 import React, {Component} from 'react';
 import Header from './Header';
 import Main from './Main';

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
