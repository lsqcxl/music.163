
require("./styles/app.scss")


import RecommendMusic from './scripts/components/RecommendMusic'

import {Router,Route,hashHistory,IndexRedirect,IndexRoute} from 'react-router'



ReactDOM.render(
    
    <Router history={hashHistory}>
        <Route path="/" component={RecommendMusic}>
            
            <IndexRoute component={RecommendMusic}/>

            <Route path="*" component={RecommendMusic}></Route>

        </Route>
    </Router>
    
    ,document.getElementById("app"))