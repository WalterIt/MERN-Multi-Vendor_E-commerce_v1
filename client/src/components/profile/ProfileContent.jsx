import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { useEffect, useState } from "react";
import AllOrders from "./AllOrders";
import AllRefundOrders from "./AllRefundOrders";
import TrackOrder from "./TrackOrder";
import PaymentMethod from "./PaymentMethod";
import Address from "./Address";
import { AiOutlineCamera } from "react-icons/ai";
import { updateUserInformation } from "../../redux/actions/user";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import axios from "axios";
import server from "../../server";

const ProfileContent = ({ active }) => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarLink, setAvatarLink] = useState("");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleImageUpdate = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = new Date().getTime() + file.name;
      // console.log(fileName);
      setAvatar(file);

      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File avaible at: ", downloadURL);
            setAvatarLink(downloadURL);
          });
        }
      );
    }
  };

  // console.log(avatarLink);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setAvatar(avatarLink);
    console.log(avatarLink);
    dispatch(
      updateUserInformation(name, user.email, phoneNumber, password, avatarLink)
    );
    toast.success("User updated successfully!");
    setPassword("");
  };

  return (
    <div className="w-full mt-[3%]">
      {/* / PROFILE PAGE / */}
      {active === 1 && (
        <>
          <form onSubmit={handleSubmit} aria-required={true}>
            <div className="flex justify-center w-full">
              <div className="relative">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt={user?.name}
                    title={user?.name}
                    className="w-[150px] h-[150px] object-cover rounded-full border-[3px] border-[#3ad132] "
                  />
                ) : (
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    title={user?.name}
                    className="w-[150px] h-[150px] object-cover rounded-full border-[3px] border-[#3ad132] "
                  />
                )}
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={handleImageUpdate}
                  />
                  <label htmlFor="image">
                    <AiOutlineCamera />
                  </label>
                </div>
              </div>
            </div>
            <br />
            <br />

            <div className="w-full px-5">
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
                  <label htmlFor="" className="block pb-2 ">
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
                  <label htmlFor="" className="block pb-2 ">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center tracking-wide font-[600] text-[#382ba1] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </div>
          </form>
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
