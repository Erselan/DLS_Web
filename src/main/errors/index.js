import React, { Fragment } from "react";

const Error = (props) => {

    const renderError = (errorCode) => {
        switch (errorCode) {
            case 401:
                return <Fragment>401</Fragment>
            case 404:
                return <Fragment>404</Fragment>
            case 500:
                return <Fragment>500</Fragment>
            default:
                break;
        }
    }

    return (
        <Fragment>
            <div style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {renderError(props.Code)}
            </div>
        </Fragment>
    );

}
export default Error;