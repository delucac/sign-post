import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../Legal.css'

export default class LegalPolicies extends Component {
    render() {
        return (
            <div className="CommunityGuidelines">
                <header className="Legal-header">
                    <h1>Community Guidelines</h1>
                </header>
                <div>
                    Words go here
                </div>
            </div>
        )
    }
}