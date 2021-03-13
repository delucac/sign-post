import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Home.css'

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <header className="Home-header">
                    <h1>Welcome</h1>
                    <p>
                        Welcome
                    </p>
                </header>
            </div>
        )
    }
}