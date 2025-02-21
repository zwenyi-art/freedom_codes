import React from "react";
import Configure from "./pages/Configure";
import { Routes, BrowserRouter as Router, Route } from "react-router";
import AdminLayout from "./layout/AdminLayout";
import Home from "./pages/Home";
import TableData from "./pages/TableData";
import Servers from "./pages/Servers";
import Login from "./pages/auth/Login";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
const ROLES = {
  User: 2001,
  Admin: 5150,
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login></Login>}></Route>
          {/* <Route
            path="unauthorize"
            element={<UnauthorizePage></UnauthorizePage>}
          ></Route> */}

          <Route element={<PersistLogin></PersistLogin>}>
            <Route
              element={<RequireAuth allowedRoles={[ROLES.Admin]}></RequireAuth>}
            >
              <Route element={<AdminLayout></AdminLayout>}>
                <Route path="dashboard" element={<Home />} />
                <Route path="servers" element={<Servers></Servers>} />
                <Route path="table" element={<TableData></TableData>} />
                <Route path="servers/configure" element={<Configure />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
