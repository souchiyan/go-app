import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth/Auth";
import PrivateRoute from "./PrivateRoute";
import Page from "./Page/Page";
import CoffeeLog from "./CoffeeLog/CoffeeLog";
import CoffeeShow from "./CoffeeLog/CoffeeShow";
import BeansShow from "./Beans/Show";
import Beans from "./Beans/Beans";
import FavoriteList from "./CoffeeLog/FavoriteList";

function App() {
  return (
    <Router>
      <PrivateRoute>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route path="/index" element={<Page />}></Route>
          <Route path="/coffeelog" element={<CoffeeLog />}></Route>
          <Route path="/beans" element={<Beans />}></Route>
          <Route path="/beans/show" element={<BeansShow />}></Route>
          <Route path="/logs/show" element={<CoffeeShow />}></Route>
          <Route path="/logs/favorites" element={<FavoriteList />}></Route>
        </Routes>
      </PrivateRoute>
    </Router>
  );
}

export default App;
