import React from 'react';
import './app.less';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Main from './Main'
import Card from './card/Card'
import Error from './error/Error'


const App = () => {

    return (
        <BrowserRouter>
            <div className='app_container'>
                <Switch>
                    <Route path='/' component={Main} exact />
                    <Route path='/card/:username/:reponame' component={Card} />
                    <Route path='/error' component={Error} />
                    <Redirect to='/' />
                </Switch>
            </div>
        </BrowserRouter>
    )
}


export default App;