import styles from "../../styles/styles";
import ShopInfo from "../../components/shop/ShopInfo";
import ShopSettings from "../../components/shop/ShopSettings.jsx";
import DashboardHeader from "../../components/shop/layout/DashboardHeader";
const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className={`${styles.section} bg-[#f5f5f5] `}>
        <div className="w-full flex justify-between py-10">
          <div className="w-[25%] bg-white rounded shadow-sm  h-auto sticky top-10 left-0 z-10 ">
            <ShopInfo isOwner={true} />
          </div>
          <div className="w-[72%] rounded ">
            <ShopSettings />
            {/* <ShopProfileData isOwner={true} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSettingsPage;
