import React from "react";
import "./globalStyle.css";
import MyRoutes from "../main/routes";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Zoom } from 'react-toastify';

const App = () => {

  return (
    <div className="root">
      <MyRoutes />

      <ToastContainer
        position="top-center"
        transition={Zoom}
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
