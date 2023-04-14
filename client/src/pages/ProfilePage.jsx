import styles from "../styles/styles";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileContent from "../components/profile/ProfileContent";
import { useState } from "react";

const ProfilePage = () => {
  const [active, setActive] = useState(1);

  window.scrollTo(0, 0);

  return (
    <div>
      <div className={`${styles.section} flex bg-[#f5f5f5] py-2 `}>
        <div className="w-[85px] 800px:w-[240px]  mt-[2%] ">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;
