import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../Home.css'

export default class PlaceCreate extends Component {

    constructor(props){
        super(props);

        this.onChangePlaceName = this.onChangePlaceName.bind(this);
        this.onChangePlaceDescription = this.onChangePlaceDescription.bind(this);
        this.onChangePlaceAddress = this.onChangePlaceAddress.bind(this);
        this.onChangePlaceOwner = this.onChangePlaceOwner.bind(this);
        this.onChangePlaceType = this.onChangePlaceType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state ={
            place_name: '',
            place_description: '',
            place_address: '',
            place_owner: '',
            place_type: ''
        }
    }

    onChangePlaceName(e){
        this.setState({
            place_name: e.target.value
        })
    }

    onChangePlaceDescription(e){
        this.setState({
            place_description: e.target.value
        })
    }

    onChangePlaceAddress(e){
        this.setState({
            place_address: e.target.value
        })
    }

    onChangePlaceOwner(e){
        this.setState({
            place_owner: e.target.value
        })
    }

    onChangePlaceType(e){
        this.setState({
            place_type: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()

        console.log(`Form submitted`);
        console.log(`place name: ${this.state.place_name}`)
        console.log(`place description: ${this.state.place_description}`)
        console.log(`place address: ${this.state.place_address}`)
        console.log(`place owner: ${this.state.place_owner}`)
        console.log(`place type: ${this.state.place_type}`)


        this.setState({
            place_name: '',
            place_description: '',
            place_address: '',
            place_owner: '',
            place_type: ''
        })
    }

    render() {
        return (
            <div className="Place-Create">
                <header className="Place-Create-header">
                    <h1>Create New Place</h1>
                </header>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.place_name}
                                    onChange={this.onChangePlaceName}
                                   />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.place_description}
                                   onChange={this.onChangePlaceDescription}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.place_address}
                                   onChange={this.onChangePlaceAddress}
                            />
                        </div>
                        <div className="form-group">
                            <label>Owner: </label>
                            <input type="text"
                                   className="form-control"
                                   value={this.state.place_owner}
                                   onChange={this.onChangePlaceOwner}
                            />
                        </div>
                        <div className="form-group">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input"
                                       type="radio"
                                       name="TypeOptions"
                                       id="Residential"
                                       value="Residential"
                                       checked={this.state.place_type==='Residential'}
                                       onChange={this.onChangePlaceType}
                                       />
                                       <label className="form-check-label">Residential</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input"
                                       type="radio"
                                       name="TypeOptions"
                                       id="Business"
                                       value="Business"
                                       checked={this.state.place_type==='Business'}
                                       onChange={this.onChangePlaceType}
                                />
                                <label className="form-check-label">Business</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input"
                                       type="radio"
                                       name="TypeOptions"
                                       id="Public"
                                       value="Public"
                                       checked={this.state.place_type==='Public'}
                                       onChange={this.onChangePlaceType}
                                />
                                <label className="form-check-label">Public</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create Place" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}