import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../Legal.css'

export default class LegalPolicies extends Component {
    render() {
        return (
            <div className="About">
                <header className="Legal-header">
                    <h1>About</h1>
                </header>
                <div className="Center">
                    This project was created by Christopher B. DeLuca as a capstone project.
                </div>
            </div>
        )
    }
}