/**
 * @Author: weijie
 * @Date:   2017-09-15T10:50:05+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-15T10:56:33+08:00
 */



 import React from 'react'
 import { Switch, Route } from 'react-router-dom'
 import Home from 'components/Home'
 import Test from 'components/Test'


 // The Main component renders one of the three provided
 // Routes (provided that one matches). Both the /roster
 // and /schedule routes will match any pathname that starts
 // with /roster or /schedule. The / route will only match
 // when the pathname is exactly the string "/"
 const Main = () => (
   <main>
     <Switch>
       <Route exact path='/' component={Home}/>
       <Route path='/test' component={Test}/>
     </Switch>
   </main>
 )

 export default Main
