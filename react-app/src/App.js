import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth/Auth";
import PrivateRoute from "./PrivateRoute";
import Page from "./Page/Page";
import CoffeeLog from "./CoffeeLog/CoffeeLog";
import CafeMap from "./CafeMap";
import CoffeeShow from "./CoffeeLog/CoffeeShow";


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
        <Route path="/logs/show" element={<CoffeeShow />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
