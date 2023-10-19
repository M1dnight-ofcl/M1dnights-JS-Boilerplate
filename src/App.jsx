import React from 'react';
import style from './App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'

const App = (prop) => {
    return (
        <main className={style.Main}>
            <h1>Hello,<br/>World!</h1>
            <p>This is a cool project that uses:</p>
            <ul>
                <li>React</li>
                <li>Electron</li>
                <li>Vite</li>
            </ul>
            <button className={style.Button}>Cool</button>
        </main>
    )
}

export default App;