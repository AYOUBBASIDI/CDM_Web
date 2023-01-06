import React from 'react';
import enterIcon from '../assets/img/enter.svg';
import clientIcon from '../assets/img/client.svg';
import { useState } from 'react';
import ins from '../assets/img/ins.svg';
import fb from '../assets/img/fb.svg';
import lin from '../assets/img/link.svg';
import yt from '../assets/img/ytb.svg';


function Footer() {
    return (
        <div>
            <div className='px-16 py-8 flex justify-between items-center'>
                <div className='w-full gradient py-8 px-16 rounded-lg primary-color flex flex-col gap-4'>
                    <div className='flex justify-between'>
                       <div><a><img className='w-40' src='https://www.creditdumaroc.ma/sites/all/themes/custom/cdm_rebrand/assets/images/icons/logo_white.svg'/></a></div>
                        <div className='flex justify-between w-40'>
                            <a><img src={fb}/></a>
                            <a><img src={ins}/></a>
                            <a><img src={yt}/></a>
                            <a><img src={lin}/></a>
                        </div> 
                    </div>
                    <div className='tiny-separated'></div>
                    <div className='flex gap-40 font-semibold text-xl'>
                        <div><h2>Quick Links : </h2></div>
                        <div className='flex gap-60'>
                            <div className='flex flex-col gap-4'>
                                <a className='cursor-pointer'>- Mon espace</a>
                                <a className='cursor-pointer'>- Devenir Client</a>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <a className='cursor-pointer'>- Nos agences</a>
                                <a className='cursor-pointer'>- Nos cartes bancaires</a>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <a className='cursor-pointer'>- Contact nous</a>
                                <a className='cursor-pointer'>- Nos partenaires</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Footer;