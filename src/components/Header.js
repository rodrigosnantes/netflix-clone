import React from 'react';

import './Header.css'

export default function Header({ blackHeader }) {
    return (
        <header className={blackHeader ? 'black' : ''}>
           <div className='header--logo'>
               <a href='/'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png' alt='netflixLogo'/>
               </a>
           </div>

           <div className='header--user'>
                <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png' alt='userLogo' />
           </div>
        </header>
    )
}