import React, {
    useContext
} from "react";

import {
    Navigate
} from "react-router-dom";

import {
    AuthContext
} from "../context/AuthContext";

function ProtectedRoute({ children }) {

    const {
        user
    } = useContext(AuthContext);

    // NOT LOGGED IN

    if (!user) {

        return <Navigate to="/login" />;

    }

    // LOGGED IN

    return children;

}

export default ProtectedRoute;