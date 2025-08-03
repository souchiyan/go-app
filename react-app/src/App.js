import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Page from "./Page";
import CoffeeLog from "./CoffeeLog";
import CafeMap from "./CafeMap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route
          path="/index"
          element={
            <PrivateRoute>
              <Page />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/coffeelog" element={<CoffeeLog />}></Route>
        <Route path="/cafemap" element={<CafeMap />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
