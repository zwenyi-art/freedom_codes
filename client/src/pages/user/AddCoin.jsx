import React from "react";
import { GiTwoCoins } from "react-icons/gi";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const AddCoin = () => {
  const { auth, setUserInfo } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const addCoinHandle = () => {
    Swal.fire({
      title: "ကူပွန်ကုဒ်ထည့်ပြီးကံစမ်းမယ်။🎁🎁",
      input: "text",
      inputPlaceholder: "ကူပွန်ကုဒ်ကို ဒီမှာထည့်ပါ...",
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      showCancelButton: true, // Enables the cancel button
      customClass: {
        popup: "bg-gray-800   rounded-lg ", // Tailwind styling for popup
        title: "text-xl font-semibold text-white", // Tailwind styling for title
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded",
      },
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed && result.value) {
        const coupon = result.value;
        try {
          const response = await axiosPrivate.post("/user", { coupon: coupon });
          setUserInfo((prev) => {
            return { ...prev, coins: response.data.data };
          });
          Swal.fire({
            title: "Congratulations!",
            text: "You got 100 coins!", // Custom message
            icon: "success", // You can keep or remove the icon
            confirmButtonText: "Close",
            customClass: {
              popup: "bg-gray-800 text-white rounded-lg", // Set background color to gray and text to white
              title: "text-2xl font-bold", // Styling for the title
              confirmButton:
                "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded", // Styling for the confirm button
            },
            background: "#333", // A different way to set background color
          });
        } catch (error) {
          if (error.status === 400) {
            Swal.fire({
              title: "Sorry!",
              text: "Your Coupon has Expired!",
              confirmButtonText: "Close", // Custom message
              customClass: {
                popup: "bg-gray-800 text-white rounded-lg", // Set background color to gray and text to white
                title: "text-2xl font-bold", // Styling for the title
                closeButton:
                  "bg-red-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded", // Styling for the confirm button
              },
              background: "#333", // A different way to set background color
            });
          }
          if (error.status === 401) {
            Swal.fire({
              title: "😒😒",
              text: "Your Coupon Is Invalid!",
              confirmButtonText: "Close", // Custom message
              customClass: {
                popup: "bg-gray-800 text-white rounded-lg", // Set background color to gray and text to white
                title: "text-2xl font-bold", // Styling for the title
                closeButton:
                  "bg-red-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded", // Styling for the confirm button
              },
              background: "#333", // A different way to set background color
            });
          }
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      } else if (result.isDismissed) {
        console.log("Modal was canceled");
      }
    });
  };
  return (
    <section className="w-full h-full">
      <div className=" w-full h-full  flex items-center justify-center">
        <button
          onClick={addCoinHandle}
          className="border px-4 py-2 rounded-md bg-gray-800 font-medium gap-x-2 w-fit h-fit flex flex-row items-center justify-center"
        >
          <p className="text-xl">Add Coins</p>
          <div className="text-yellow-400 w-fit h-fit flex items-center justify-center">
            <GiTwoCoins size={25} />
            <p className="text-2xl">+</p>
          </div>
        </button>
      </div>
    </section>
  );
};

export default AddCoin;
