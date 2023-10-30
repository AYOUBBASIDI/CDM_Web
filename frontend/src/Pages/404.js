import React from 'react';
import Header from '../components/Header.js';
import './notfound.css'

function NotFound() {

    return (
        <div className='message'>
            <div class="scene">
        <div class="overlay"></div>
        <div class="overlay"></div>
        <div class="overlay"></div>
        <div class="overlay"></div>
        <span class="bg-403">404</span>
        <div class="text">
            <span class="hero-text"></span>
            <span class="msg">Look like <span>you</span> lost.</span>
            <span class="support">
            <span>lost?</span>
            <a href="#">contact support</a>
            </span>
        </div>
        <div class="lock"></div>
        </div>
        </div>
        
    )
}

export default NotFound;
