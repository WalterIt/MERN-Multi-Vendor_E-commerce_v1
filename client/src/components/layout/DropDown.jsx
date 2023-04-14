import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  //   console.log(categoriesData);

  const handleSubmit = (item) => {
    navigate(`/products?category=${item.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((item, i) => (
          <div
            key={i}
            className={`${styles.noramlFlex}`}
            onClick={() => handleSubmit(item)}
          >
            <img
              src={item.image_Url}
              alt={item.title}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
            />
            <h3 className="m-3 cursor-pointer select-none">{item.title} </h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
