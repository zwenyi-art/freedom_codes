import React from "react";
import UserLayout from "./layout/UserLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import AddCoin from "./pages/user/AddCoin";
import CustomServers from "./pages/user/CustomServers";
import SpeedTest from "./pages/user/SpeedTest";
import PageTransition from "./components/common/PageTransition";
import AdminLayout from "./layout/AdminLayout";
import Login from "./pages/auth/Login";
import RequireAuth from "./components/common/RequireAuth";
import LandingPage from "./pages/LandingPage";
import UnauthorizePage from "./pages/UnauthorizePage";
import NetSpeed from "./pages/user/NetSpeed";
const ROLES = {
  User: 2001,
  Admin: 5150,
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage></LandingPage>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
          <Route
            path="unauthorize"
            element={<UnauthorizePage></UnauthorizePage>}
          ></Route>

          {/* user layout */}
          <Route
            element={<RequireAuth allowedRoles={[ROLES.User]}></RequireAuth>}
          >
            <Route element={<UserLayout></UserLayout>}>
              <Route path="home" element={<Home></Home>}></Route>
              <Route path="add-coins" element={<AddCoin></AddCoin>}></Route>
              <Route
                path="servers"
                element={<CustomServers></CustomServers>}
              ></Route>
              <Route
                path="speed-test"
                element={<SpeedTest></SpeedTest>}
              ></Route>
            </Route>
          </Route>
          {/* admin layout */}
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Admin]}></RequireAuth>}
          >
            <Route path="admin" element={<AdminLayout></AdminLayout>}></Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
