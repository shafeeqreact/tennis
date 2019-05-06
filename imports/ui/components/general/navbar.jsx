import React from 'react';

const Navbar = () => {
    return (
        <nav className="p-0 m-0 navbar navbar-expand fixed-top bg-white fixed-top">
            <div className="container">
                <div className="mobilenav navbar-brand mx-auto d-block">
                    <a className="hide-on-fallback">
                        <img src="/img/logo.svg" className="logo" alt="Voozlr" />
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;