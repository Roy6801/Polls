import React from 'react'; 
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom'
import Home from './pages/Home';
import Report from './pages/Report';
import createforms from './pages/createforms';
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/report' component={Report} />
        <Route path='/createform' component={createforms} />
      </Switch>
    </Router>
    </>
    
  );
}

export default App;
