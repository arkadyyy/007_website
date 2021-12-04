import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TicketPage from "./pages/TicketPage/TicketPage";
import MerchPage from "./pages/MerchPage/MerchPage";
import CarsPage from "./pages/CarsPage/CarsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProductPage from "./pages/MerchPage/ProductPage/ProductPage";
import AdminLogin from "./pages/AdminPage/AdminLogin/AdminLogin";
import AdminPage from "./pages/AdminPage/AdminPage";
import { BreakpointProvider, setDefaultBreakpoints } from "react-socks";

setDefaultBreakpoints([
  { xs: 0 },
  { s: 376 },
  { m: 426 },
  { l: 769 },
  { xl: 1025 },
]);

function App() {
  return (
    <>
      <BreakpointProvider>
        <Router>
          <Switch>
            <Route exact path='/' exact component={HomePage} />
            <Route exact path='/ticket' exact component={TicketPage} />
            <Route exact path='/merch' exact component={MerchPage} />
            <Route exact path='/cars' exact component={CarsPage} />
            <Route
              exact
              path='/shop/:product_id/:selectedCurrency/:currency'
              exact
              component={ProductPage}
            />
            <Route exact path='/admin' exact component={AdminPage} />
            <Route exact path='/admin_login' exact component={AdminLogin} />
            <Route exact path='*' exact component={NotFoundPage} />
          </Switch>
        </Router>
      </BreakpointProvider>
    </>
  );
}

export default App;
