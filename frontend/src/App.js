import { Route, Switch } from "react-router-dom";
import Spots from "./components/Routes/Spots/Spots";
import Spot from "./components/Routes/Spot";
import Layout from "./components/Layout";
import NewSpotForm from "./components/Routes/New/NewSpotForm";
import CurrentUserSpots from "./components/Routes/Current/CurrentUserSpots";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Spots} />
        <Route path="/spots/:id/edit" component={NewSpotForm} />
        <Route path="/spots/new" component={NewSpotForm} />
        <Route path="/spots/current" component={CurrentUserSpots} />
        <Route path="/spots/:id" component={Spot} />
      </Switch>
    </Layout>
  );
}

export default App;
