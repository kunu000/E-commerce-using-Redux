// importing elements from react-toastify package
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// this functions shows Notifications
function Notification(message, isError) {
  if (isError) {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

// exporting Notification function
export default Notification;
