import React, { useState, useEffect } from "react";
import { NavLink, Route } from "react-router-dom";

import { Role } from "../_helpers";
import { accountService } from "../account";

const Nav = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  if (!user) return;

  return (
    <div>
      <nav className="navbar navbar-expand navbark-dark bg-dark">
        <div className="navbar-nav">
          <NavLink exact to="/" className="nav-item nav-link">
            Home
          </NavLink>
          <NavLink to="/profile" className="nav-item nav-link">
            Profile
          </NavLink>
          {user.role === Role.Admin && (
            <NavLink to="/admin" className="nav-item nav-link">
              Admin
            </NavLink>
          )}
        </div>
      </nav>
      <Route path="/admin" component={AdminNav} />
    </div>
  );

  function AdminNav({ match }) {
    const { path } = match;

    return (
      <nav className="admin-nav navbar navbar-expand navbar-light">
        <div className="navbar-nav">
          <NavLink to={`${path}/users`} className="nav-item nav-link">
            Users
          </NavLink>
        </div>
      </nav>
    );
  }
};

export { Nav };
