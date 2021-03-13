import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Home.css'

export default class Place extends Component {
    render() {
        return (
            <div className="Place">
                <header className="Place-header">
                    <h1>Welcome</h1>
                    <p>
                        Welcome
                    </p>
                </header>
            </div>
        )
    }
}