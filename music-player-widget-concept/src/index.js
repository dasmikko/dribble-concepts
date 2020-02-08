import React from 'react';
import ReactDOM from 'react-dom';
import MediaWidget from './components/mediaWidget/mediaWidget'

import './styles/styles.scss';

//import { BrowserRouter, Switch, Route } from 'react-router-dom';

//import Elements from './routes/Elements';
//import Dashboard from './routes/Dashboard';
//import Auth from './routes/Auth';

class App extends React.Component {
  render() {
    return (
      <MediaWidget />
    );
  }
}

const el = document.getElementById('app');
ReactDOM.render(<App />, el);