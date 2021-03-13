import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../Legal.css'

export default class LegalPolicies extends Component {
    render() {
        return (
            <div className="Privacy">
                <header className="Legal-header">
                    <h1>Privacy Policy</h1>
                </header>
                <div>
                    Words go here
                </div>
            </div>
        )
    }
}