/**
 * @Author: weijie
 * @Date:   2017-09-15T10:49:33+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: index.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-15T10:56:42+08:00
 */


 import React from 'react'
 import { Link } from 'react-router-dom'

 // The Header creates links that can be used to navigate
 // between routes.
 const Header = () => (
   <header>
     <nav>
       <ul>
         <li><Link to='/'>Home</Link></li>
         <li><Link to='/test'>Test</Link></li>
       </ul>
     </nav>
   </header>
 )

 export default Header
