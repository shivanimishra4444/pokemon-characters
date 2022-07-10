import React from 'react';
import { Route, Switch } from 'react-router';
import cardDetails from '@/components/card/cardDetails';
import Home from './home';
import { withRouter } from 'react-router-dom';


const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/detail/:name" component={cardDetails} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};
export default withRouter(Routes);
