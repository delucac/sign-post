import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Legal.css'

export default class Legal extends Component {
    render() {
        return (
            <div className="Legal">
                <header className="Legal-header">
                    <h1>Legal Notices</h1>
                </header>
                <div>
                    <ul>
                        <li><Link to="/Legal/Privacy" className="nav-link">Privacy Policy</Link></li>
                        <li><Link to="/Legal/CommunityGuidelines" className="nav-link">Community Guidelines</Link></li>
                        <li><Link to="/Legal/3rdParty" className="nav-link">3rd Party Resources</Link></li>
                        <li><Link to="/Legal/About" className="nav-link">About</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}