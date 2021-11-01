import axios from "axios";
import { toast } from "react-toastify";
const { REACT_APP_API_URL } = process.env;
export function apiCall(method, path, data = {}) {
  return new Promise((resolve, reject) => {
    return (
      axios[method](REACT_APP_API_URL + path, data)
        // axios[method]("https://7d5c79ff5fcd.ngrok.io/api/v1" + path, data)
        .then((res) => {

          //only showing toast if status of req is 201 which means it was a write request 
          if (res.status === 201) {
            toast.success(res.data.message);
          }

          return resolve(res.data);
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.message || "Something went Wrong!");
            return reject(error.response.data.message || "Something went Wrong!");
          } else if (error.request) {
            toast.error("Check Your Internet !");
            return reject("Check Your Internet !");
          } else {
            return reject("Something went Wrong!");
          }
        })
    );
  });
}