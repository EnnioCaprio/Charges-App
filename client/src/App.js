import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import MobilePage from './components/Mobile/MobilePage';
import NotFound from './components/Error/NotFound';
import Homepage from './components/Homepage/Homepage';
import Header from './components/Header/Header';
import Presentation from './components/Presentations/Presentation';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import useWindowDimensions from "./customHook/useWindowDimensions";

function App() {

  const { width, height } = useWindowDimensions();

  return (
    <div className="App">
      <Router>
        <Header />
        {
          width >= 768 ?
            <Switch>
              <Route path="/" exact component={Presentation} />
              <ProtectedRoute path="/homepage" exact component={Homepage} />
              <Route component={NotFound} />
            </Switch>
            :
            <MobilePage />
        }
      </Router>
    </div>
  );
}

export default App;
