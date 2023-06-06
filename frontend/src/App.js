import { Route, Switch } from "react-router-dom";
import Spots from "./components/Routes/Spots/Spots";
import Spot from "./components/Routes/Spot";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Spots} />
        <Route path="/spots/:id" component={Spot} />
      </Switch>
    </Layout>
  );
}

export default App;
