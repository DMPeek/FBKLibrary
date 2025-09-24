import { useState, useRef, useEffect } from 'react';
import '../styles.css';
import { Monsters } from '../assets/monsters';

export default function TeamBuilder() {
    return (
        <div>
            <header className="header-bar">
                <div className="header-left">
                    <a href="/" className="logo">FBK Labs</a>
                </div>
                <nav className="header-right">
                    <a href="/">Calculator</a>
                    <a href="/Orbs">Orbs</a>
                    <a href="/TeamBuilder">Team Builder</a>
                </nav>
            </header>
        </div>
    )
}

