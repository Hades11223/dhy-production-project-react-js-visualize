import React from "react";
import RouterWithPaths from "@components/RouterWithPaths";
import Site from "@containers";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
function App() {
  const routers = [
    {
      path: [
        "/",
        "/:function1",
        "/:function1/:id",
        "/:function1/:function2/:id",
      ],
      component: Site,
    },
  ];

  return (
    <BrowserRouter>
      <Switch>
        {routers.map((route, key) => {
          if (route.component)
            return (
              <RouterWithPaths
                exact
                key={key}
                path={route.path}
                render={(props) => {
                  return <route.component {...props} />;
                }}
              />
            );
          return null;
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
