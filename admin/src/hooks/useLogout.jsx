import useAuth from "./useAuth";
import Swal from "sweetalert2";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router";

const useLogout = () => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const logout = async () => {
    Swal.fire({
      title: "Are you sure?",
      html: `<h1 class="text-gray-400">You will be logged out!</h1>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, Cancel",
      customClass: {
        popup: "bg-gray-800   rounded-lg ", // Tailwind styling for popup
        title: "text-xl font-semibold text-white", // Tailwind styling for title
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded", // Confirm button style
        cancelButton:
          "bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded", // Cancel button style
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Perform logout action
        try {
          await axios("/logout", { withCredentials: true });
          if (auth?.accessToken) {
            navigate("/login", { state: { from: location }, replace: true });
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("Logout canceled");
      }
    });
  };
  return logout;
};

export default useLogout;
