import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { BASE_URL } from "../constants";

const ModalBuyer = ({
  setIsShowedBuyerForm,
  isShowedBuyerForm,
  VehicleIdToBuy,
  getAllVehicles,
  setVehicleIdToBuy,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClickCloseBuyerModal = () => {
    setIsShowedBuyerForm((isShowedBuyerForm) => !isShowedBuyerForm);
    reset({
      buyerName: "",
      buyerDocument: "",
    });
  };

  const buyerSubmit = (data) => {
    const URL = BASE_URL + `/vehicles/${VehicleIdToBuy}/sales`;
    axios
      .patch(URL, data)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Vehicle sold successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        getAllVehicles();
        reset();
        setIsShowedBuyerForm(!isShowedBuyerForm);
        setVehicleIdToBuy();
      })
      .catch((err) => {
        console.log(err);

        Swal.fire({
          icon: "error",
          title: "Something went wrong. Try again!",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  return (
    <section
      className={`fixed top-0 left-0 bottom-0 right-0 bg-red flex bg-black/40 justify-center items-center transition-opacity z-20 ${
        isShowedBuyerForm ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <form
        onSubmit={handleSubmit(buyerSubmit)}
        className="bg-white p-4 grid gap-4 rounded-md w-[300px] relative overflow-y-auto sm:w-[450px] sm:py-6 sm:px-8"
      >
        <h3 className="text-2xl font-bold text-secondary-color text-center">
          Buyer info
        </h3>

        <div className="grid gap-1">
          <label className="text-xs font-semibold" htmlFor="buyerName">
            Buyer Name <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="Example: Pedro Perez"
            className="border-[1px] rounded-sm bg-gray-100 p-1 focus:ring-1 focus:ring-primary-color focus:border-primary-color placeholder:text-xs"
            id="buyerName"
            type="text"
            {...register("buyerName", {
              required: "This field is required",
              maxLength: {
                value: 40,
                message: "You have exceeded the maximum characters allowed",
              },
              minLength: {
                value: 2,
                message: "You must enter more than one character",
              },
            })}
          />
          <span className="text-primary-color text-xs">
            {errors.buyerName && errors.buyerName.message}
          </span>
        </div>

        <div className="grid gap-1">
          <label className="text-xs font-semibold" htmlFor="buyerDocument">
            Buyer Document
          </label>
          <input
            placeholder="only for used vehicles"
            className="placeholder:text-xs border-[1px] rounded-sm bg-gray-100 p-1 focus:ring-1 focus:ring-primary-color focus:border-primary-color"
            id="buyerDocument"
            type="text"
            {...register("buyerDocument", {
              required: "This field is required",
              maxLength: {
                value: 10,
                message: "You have exceeded the maximum characters allowed",
              },
              minLength: {
                value: 2,
                message: "You must enter more than one character",
              },
            })}
          />
          <span className="text-primary-color text-xs">
            {errors.buyerDocument && errors.buyerDocument.message}
          </span>
        </div>

        <i
          onClick={handleClickCloseBuyerModal}
          className="bx bx-x absolute right-2 top-1 text-2xl hover:text-primary-color cursor-pointer"
        ></i>

        <button className="bg-primary-color text-white p-2 text-sm border-2 border-transparent hover:text-[0.9rem] hover:border-secondary-color transition-colors rounded-md sm:max-w-max sm:mx-auto sm:px-8">
          Sell vehicle
        </button>
      </form>
    </section>
  );
};

export default ModalBuyer;
