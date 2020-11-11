import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import ListOntologies from './components/listOntologies.jsx';
import OntologyContent from './components/ontologyContent.jsx';

function App() {


  return (
    <Router>
      <div> 
        <Switch>
          <Route path="/" exact component={ListOntologies} />
          <Route component={OntologyContent} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
