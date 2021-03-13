import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Home.css'

export default class Profile extends Component {
    render() {
        return (
            <div className="Profile">
                <header className="Profile-header">
                    <h1>Welcome</h1>
                    <p>
                        Welcome
                    </p>
                </header>
            </div>
        )
    }
}