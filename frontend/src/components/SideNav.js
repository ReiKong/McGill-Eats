import './SideNav.css';
import React, { useState } from "react";
import oneCardLogoGray from './images/oneCardLogoGray.png';
import Button from './Buttons';


function SideNav() {
    return (
        <div className='side-nav'>
            <div id="wrapper">
                <div>
                    <Button />
                </div>
                <hr className='divider' />

                <div className='place-overview'>
                    <p className='place-name'>Basha Sherbrooke</p>
                    <p>
                        <span>★★★</span>
                        <span>★★</span>
                    </p>
                    <p>
                        <span>Lebanese restaurant</span>
                        <span> · </span>
                        <span>660 Milton St</span>
                    </p>
                    <p>
                        <span>Open</span>
                        <span> · </span>
                        <span>Closes 11 p.m.</span>
                    </p>
                    <p>
                        <span>$</span>
                        <span> · </span>
                        <img style={{ height: 22 }} src={oneCardLogoGray}></img>
                    </p>
                </div>

                <hr className='divider' />

                <div className='place-overview'>
                    <p className='place-name'>Basha Sherbrooke</p>
                    <p>
                        <span>★★★</span>
                        <span>★★</span>
                    </p>
                    <p>
                        <span>Lebanese restaurant</span>
                        <span> · </span>
                        <span>660 Milton St</span>
                    </p>
                    <p>
                        <span>Open</span>
                        <span> · </span>
                        <span>Closes 11 p.m.</span>
                    </p>
                    <p>
                        <span>$</span>
                        <span> · </span>
                        <img style={{ height: 22 }} src={oneCardLogoGray}></img>
                    </p>
                </div>

                <hr className='divider' />

                <div className='place-overview'>
                    <p className='place-name'>Basha Sherbrooke</p>
                    <p>
                        <span>★★★</span>
                        <span>★★</span>
                    </p>
                    <p>
                        <span>Lebanese restaurant</span>
                        <span> · </span>
                        <span>660 Milton St</span>
                    </p>
                    <p>
                        <span>Open</span>
                        <span> · </span>
                        <span>Closes 11 p.m.</span>
                    </p>
                    <p>
                        <span>$</span>
                        <span> · </span>
                        <img style={{ height: 22 }} src={oneCardLogoGray}></img>
                    </p>
                </div>

                <hr className='divider' />

                <div className='place-overview'>
                    <p className='place-name'>Basha Sherbrooke</p>
                    <p>
                        <span>★★★</span>
                        <span>★★</span>
                    </p>
                    <p>
                        <span>Lebanese restaurant</span>
                        <span> · </span>
                        <span>660 Milton St</span>
                    </p>
                    <p>
                        <span>Open</span>
                        <span> · </span>
                        <span>Closes 11 p.m.</span>
                    </p>
                    <p>
                        <span>$</span>
                        <span> · </span>
                        <img style={{ height: 22 }} src={oneCardLogoGray}></img>
                    </p>
                </div>

                <hr className='divider' />

            </div>
        </div>
    );
}


export default SideNav;