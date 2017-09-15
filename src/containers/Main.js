/**
 * @Author: weijie
 * @Date:   2017-09-15T11:22:23+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: Main.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-15T13:56:17+08:00
 */



 import React from 'react'
 import { Switch, Route } from 'react-router-dom'
 import Home from './Home'
 // import Test from './Test'
 import VideoBarrage from 'containers/VideoBarrage'

 // The Main component renders one of the three provided
 // Routes (provided that one matches). Both the /roster
 // and /schedule routes will match any pathname that starts
 // with /roster or /schedule. The / route will only match
 // when the pathname is exactly the string "/"
 const Main = () => (
   <main className="page-main">
     <Switch>
       <Route exact path='/' component={Home}/>
       {/* <Route path='/test' component={Test}/> */}
       <Route path='/video-barrage' component={VideoBarrage}/>
     </Switch>
   </main>
 )

 export default Main
