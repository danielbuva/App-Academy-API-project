import { Route, Switch } from "react-router-dom";
import Spots from "./components/Routes/Spots/Spots";
import Spot from "./components/Routes/Spot";
import Layout from "./components/Layout";
import SpotForm from "./components/Routes/New/SpotForm";
import CurrentUserSpots from "./components/Routes/Current/CurrentUserSpots";
import useIsValidated from "./hooks/useIsValidated";

function App() {
  return (
    useIsValidated() && (
      <Layout>
        <Switch>
          <Route exact path="/" component={Spots} />
          <Route path="/spots/:id/edit" component={SpotForm} />
          <Route path="/spots/new" component={SpotForm} />
          <Route path="/spots/current" component={CurrentUserSpots} />
          <Route path="/spots/:id" component={Spot} />
        </Switch>
      </Layout>
    )
  );
}

export default App;
