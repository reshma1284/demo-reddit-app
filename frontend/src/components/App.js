import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import HomePage from './HomePage';
import Timeline from './Timeline';


class App extends React.Component{
  render(){
    return(
      <Router>
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/feed' component={Timeline} />
          </Switch>
      </Router>
    )

  }
}

export default App;
