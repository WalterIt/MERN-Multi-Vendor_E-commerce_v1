import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { useState } from "react";
import AllOrders from "./AllOrders";
import AllRefundOrders from "./AllRefundOrders";
import TrackOrder from "./TrackOrder";
import PaymentMethod from "./PaymentMethod";
import Address from "./Address";
import { AiOutlineCamera } from "react-icons/ai";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement this function
  };

  return (
    <div className="w-full mt-[3%]">
      {/* / PROFILE PAGE / */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={user?.avatar}
                alt={user?.name}
                title={user?.name}
                className="w-[150px] h-[150px] object-cover rounded-full border-[3px] border-[#3ad132] "
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <br />

          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%] ">
                  <label htmlFor="" className="block pb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%] ">
                  <label htmlFor="" className="block pb-2 pt-2">
                    Email
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={user?.email}
                    disabled
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block  pb-3">
                <div className="w-[100%] 800px:w-[50%] ">
                  <label htmlFor="" className="block pb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%] ">
                  <label htmlFor="" className="block pb-2 pt-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%] ">
                  <label htmlFor="" className="block pb-2">
                    Address 1
                  </label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%] ">
                  <label htmlFor="" className="block pb-2 pt-2">
                    Address 2
                  </label>
                  <input
                    type="address"
                    className={`${styles.input} !w-[95%]`}
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center tracking-wide font-[600] text-[#382ba1] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* / ORDER PAGE / */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* / TRACK ORDER  / */}
      {active === 3 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* / REFUNDS PAGE / */}
      {active === 4 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* PAYMENT METHODS */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/* ADDRESS*/}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
