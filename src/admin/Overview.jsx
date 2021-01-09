import React from "react";
import { Link } from "react-router-dom";

const Overview = ({ match }) => {
  const { path } = match;

  return (
    <div>
      <h1>Admin</h1>
      <p>This section can only be accessed by adminstrators.</p>
      <p>
        <Link to={`${path}/users`}>Manage Users</Link>
      </p>
    </div>
  );
};

export { Overview };
