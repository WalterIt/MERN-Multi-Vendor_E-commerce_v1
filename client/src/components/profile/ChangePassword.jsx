import React, { useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import server from "../../server";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) toast.error("Passwords do not match!");

    await axios
      .put(`${server}/user/update-user-password`, { oldPassword, password })
      .then((response) => {
        toast.success(response.data.message);
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] font-semibold text-center font-900 text-[#000000ba] pb-10 ">
        Change Password
      </h1>
      <form
        onSubmit={handleSubmit}
        aria-required={true}
        className="flex flex-col items-center"
      >
        <div className="w-[100%] 800px:w-[50%] pb-2 ">
          <label htmlFor="" className="block pb-2">
            Enter your Old Password
          </label>
          <input
            type="password"
            className={`${styles.input} !w-[95%]`}
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="w-[100%] 800px:w-[50%]  pb-2">
          <label htmlFor="" className="block pb-2 ">
            New Password
          </label>
          <input
            type="password"
            className={`${styles.input} !w-[95%]`}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-[100%] 800px:w-[50%]  pb-2">
          <label htmlFor="" className="block pb-2 ">
            Confirm Password
          </label>
          <input
            type="password"
            className={`${styles.input} !w-[95%]`}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="w-[100%] 800px:w-[50%]  pb-2">
          <input
            className={`w-[95%] h-[40px] border border-[#3a24db] text-center tracking-wide font-[600] text-[#382ba1] 
            rounded-[3px] mt-8 cursor-pointer hover:font-[700] hover:tracking-widest hover:scale-105`}
            required
            value="Update"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
