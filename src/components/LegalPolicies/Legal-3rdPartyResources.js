import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../Legal.css'

export default class LegalPolicies extends Component {
    render() {
        return (
            <div className="3rdPartyResources">
                <header className="Legal-header">
                    <h1>3rd Party Resources</h1>
                </header>
                <div>
                    <a href="https://www.openstreetmap.org/">OpenStreetMap.org</a>
                </div>
                <div>
                    <a href="https://wiki.openstreetmap.org/wiki/API">OpenStreetMap API</a>
                </div>
            </div>
        )
    }
}