import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import { Component } from 'react';
import Landing from './Landing';
const Dashboard = ()=> <h2>dashboard</h2>;
const SurveyNew = ()=> <h2>survey new</h2>;



class App extends Component{
    componentDidMount() {
        this.props.fetchUser();
    }

    render () {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path="/" exact component={Landing} />
                        <Route path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};
 
export default connect(null, actions)(App);

