
require("./styles/app.scss")

import RootComponent from './scripts/components/RootComponent'


import {Router,Route,hashHistory,IndexRedirect,IndexRoute} from 'react-router'


import RecommendMusic from './scripts/components/RecommendMusic'
import HotMusic from './scripts/components/HotMusic'
import SearchMusic from './scripts/components/SearchMusic'




ReactDOM.render(
    
    <Router history={hashHistory}>
        <Route path="/" component={RootComponent}>
            
            <IndexRoute component={RecommendMusic}/>
			<Route path="hot"        component={HotMusic}></Route>
            <Route path="search"  component={SearchMusic}></Route>
            <Route path="*"            component={RecommendMusic}></Route>

        </Route>
    </Router>
    
    ,document.getElementById("app"))