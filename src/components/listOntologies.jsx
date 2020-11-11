import React, { Component } from 'react';
import axios from 'axios'
import {fusekiURL} from '../constants.js';
import {Link} from 'react-router-dom';



class ListOntologies extends Component {
    state = { 
        ontologies: []
     };

    componentDidMount(){
        this.getOntologiesNames();
    }

    
    render() { 
        return ( 
            <div>    
                <h1> BioData.pt Ontologies </h1>
                <br></br>    
                         
                <table className="table table-striped" id="ontologyTable">
                    <thead>
                        <tr>
                            <th> Ontology </th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>

                <button onClick= {() => this.getOntologiesNames()} className="btn btn-secondary m-2 btn-sm">
                    Refresh Ontologies
                </button>
            </div>
         );
    }

    // Make GET request to Fuseki to get all the ontologies names and updates the ontologies state
    async getOntologiesNames () {
        const datasets = await axios.get(fusekiURL + '$/datasets');

        this.setState({ontologies: []});

        for (var ele in datasets.data.datasets) {
            var value = datasets.data.datasets[ele]["ds.name"];
            var joined = this.state.ontologies.concat(value);
            this.setState({ ontologies: joined })
        }        

    }

    // Render the Table data
    renderTableData() {
        return this.state.ontologies.map(ontology => {
            var newPath = ontology;
           return (
              <tr key={ontology}>
                <Link to={newPath} className="btn btn-primary m-2 btn-sm" > {ontology} </Link>
              </tr>
           )
        })
     }


}


 
export default ListOntologies;