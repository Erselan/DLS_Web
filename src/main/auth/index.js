import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Authenticator = (Component, userType) => {



    const NewComponent = () => {

        let history = useHistory();

        useEffect(() => {
            if (userType === "teacher") {
                if (localStorage.getItem("teacherLoggedIn")) {
                    history.push("/not-authorized");
                }
            } else if (userType === "admin") {
                if (localStorage.getItem("adminLoggedIn")) {
                    history.push("/not-authorized");
                }
            }
        }, [history])

        return <Component />;
    }

    return NewComponent;

}

export default Authenticator;