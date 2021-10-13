import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Switch } from "react-router-dom";
import ExtensionConsumerChild from "./ExtensionConsumerChild";
import LoginHandlerComponent from "./LoginHandlerComponent";
import PrivateRoute from "./PrivateRoute";

const PlansList: React.FC = () => {
  const queryClient = new QueryClient();
  // TODO: Handle Auth when the shared token is made available from the console.
  // https://github.com/openshift/api/pull/1020
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/handle-login" component={LoginHandlerComponent} />
        <PrivateRoute
          path="/"
          // isLoggedIn={!!auth.user}
          isLoggedIn={true}
          component={ExtensionConsumerChild}
        />
      </Switch>
    </QueryClientProvider>
  );
};

export default PlansList;
