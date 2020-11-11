import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import {fusekiURL, queryGetAll} from '../constants.js';

class OntologyContent extends Component {
    state = { 
        ontologyName: this.props.location.pathname.replace('/', ''),
        ontologyJSON: {} 
    }

    componentDidMount() {
        this.getOntologyQuery();
    }
    
    render() { 
        return ( 
            <div>
                <div style={{ display: "flex" }}>
                    <div>
                        <h1> {this.state.ontologyName} </h1>
                    </div>

                    <div style={{ marginLeft: "auto" }}>
                        <Link to='/' className="btn btn-secondary m-2 btn-sm" > Go Back </Link>
                    </div>
                    
                    
                </div>
                
                <div>
                    <table className="table table-striped" id="contentTable">

                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                    </table>

                    <Link to='/' className="btn btn-secondary m-2 btn-sm" > Go Back </Link>
                </div>
                
            </div>
            
         );
    }

    // Get the Query Select * Where { ?subject ?predicate ?object } to Fuseki and saves it in State.ontologyJSON
    async getOntologyQuery () {
        const ttl2jsonld = require('@frogcat/ttl2jsonld').parse;

        const query = fusekiURL + this.state.ontologyName + '#query=' + queryGetAll;
        const datasets = await axios.get( query );   
        
        const jsonld = ttl2jsonld(datasets.request.response);

        this.setState({ontologyJSON: jsonld});
    }

    // Render the Table data
    renderTableData() {
        return Object.keys(this.state.ontologyJSON).map(type => {
            if (type === "@context") {
                
            } else {

                if (typeof this.state.ontologyJSON[type] === 'object' && this.state.ontologyJSON[type] !== null) {
                    return (
                        <tr key={type}>
                            <td> {type} </td>
                            <td> 
                                {this.renderObjectData(this.state.ontologyJSON[type])}
                            </td>
                        </tr>
                    )
                } else {
                    return (
                        <tr key={type}>
                            <td> {type} </td>
                            <td> {this.state.ontologyJSON[type]} </td>
                        </tr>
                    )
                }


            }
        })
     }

     // Recursive function for render table
     renderObjectData(obj) {
        return Object.keys(obj).map(type => {
            if (typeof obj[type] === 'object' && obj[type] !== null) {
                return (
                    <tr key={type}>
                        <td> {type} </td>
                        <td> 
                            {this.renderObjectData(obj[type])} 
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={type}>
                        <td> {type} </td>
                        <td> {obj[type]} </td>
                    </tr>
                )
            }
        })
     }

}


 
export default OntologyContent;