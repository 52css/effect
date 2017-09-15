/**
 * @Author: weijie
 * @Date:   2017-09-15T11:22:00+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: Header.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-15T13:56:21+08:00
 */



 import React from 'react'
 import { Link } from 'react-router-dom'

 // The Header creates links that can be used to navigate
 // between routes.
 const Header = () => (
   <header className="page-header clearfix">
     <nav>
       <ul>
         <li><Link to='/'>Home</Link></li>
         {/* <li><Link to='/test'>Test</Link></li> */}
         <li><Link to='/video-barrage'>VideoBarrage</Link></li>
       </ul>
     </nav>
   </header>
 )

 export default Header
