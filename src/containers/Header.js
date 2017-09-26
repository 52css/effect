/**
 * @Author: weijie
 * @Date:   2017-09-15T11:22:00+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: Header.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-18T10:44:53+08:00
 */



 import React from 'react'
 import { Link } from 'react-router-dom'

 // The Header creates links that can be used to navigate
 // between routes.
 const Header = () => (
   <header className="page-header clearfix">
     <nav>
       <ul>
         <li><Link to='/' activeStyle={{ color: 'red' }}>Home</Link></li>
         {/* <li><Link to='/test'>Test</Link></li> */}
         <li><Link to='/video-barrage' activeStyle={{ color: 'red' }}>VideoBarrage</Link></li>
         <li><Link to='/h5-preUpload-preview' activeStyle={{ color: 'red' }}>H5PreUploadPreview</Link></li>
         <li><Link to='/webrtc' activeStyle={{ color: 'red' }}>WebRTC</Link></li>
         <li><Link to='/animate-water-in-bottle' activeStyle={{ color: 'red' }}>AnimateWaterInBottle</Link></li>
         <li><Link to='/png-icon-color-fill' activeStyle={{ color: 'red' }}>PngIconColorFill</Link></li>
         <li><Link to='/svg-flip' activeStyle={{ color: 'red' }}>SvgFlip</Link></li>
       </ul>
     </nav>
   </header>
 );

 export default Header
