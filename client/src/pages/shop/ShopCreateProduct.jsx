import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { createProduct } from "../../redux/actions/product";
import { useEffect } from "react";

const ShopCreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  //create a function handleImagesUpload
  const handleImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
    const fileNames = files.map(
      (file) => `${new Date().getTime()}${file.name}`
    );
    const storage = getStorage(app);
    const storageRefs = fileNames.map((fileName) => ref(storage, fileName));
    const imagesUrlFirebase = [];

    for (let i = 0; i < files.length; i++) {
      const snapshot = await uploadBytesResumable(storageRefs[i], files[i]);
      const downloadURL = await getDownloadURL(snapshot.ref);
      imagesUrlFirebase.push(downloadURL);
    }

    setImagesUrl(imagesUrlFirebase);
    // console.log(imagesUrlFirebase);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = {
      name,
      description,
      category,
      tags,
      images: imagesUrl,
      originalPrice,
      discountPrice,
      stock,
      shopId: seller._id,
    };
    // console.log(newForm);
    dispatch(createProduct(newForm));

    if (error) toast.error(error);
    if (success) {
      toast.success("Product created Successfully!");
      navigate("/dashboard/products");
    }
  };

  return (
    <div className="w-full justify-center flex">
      <div className="w-[90%] 800px:w-[60%] bg-white shadow h-[90vh] overflow-y-scroll rounded-[4px] p-3  ">
        <h5 className="text-[30px] font-Popins text-center ">Create Product</h5>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="" className="py-2">
              Name <span className="text-red-500 font-extrabold">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 appearance-none block w-full mb-3 px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm  "
              placeholder="Enter your Product Name"
            />
          </div>

          <div>
            <label htmlFor="" className="py-2">
              Description <span className="text-red-500 font-extrabold">*</span>
            </label>
            <textarea
              name="description"
              cols="30"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="appearance-none mb-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label htmlFor="" className="py-2">
              Category<span className="text-red-500 font-extrabold">*</span>
            </label>
            <select
              name=""
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-2 mb-3 border h-9 rounded  "
            >
              <option value="Choose a Category">Choose a Category</option>
              {categoriesData &&
                categoriesData.map((item, i) => (
                  <option key={i} value={item.title}>
                    {item.title}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="" className="py-2">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-2 appearance-none block w-full mb-3 px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm  "
              placeholder="Enter your Product Tags..."
            />
          </div>
          <div>
            <label htmlFor="" className="py-2">
              Original Price
            </label>
            <input
              type="number"
              name="originalPrice"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="mt-2 appearance-none block w-full mb-3 px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm  "
              placeholder="Enter your Product Price..."
            />
          </div>

          <div>
            <label htmlFor="" className="py-2">
              Price (With Discount)
              <span className="text-red-500 font-extrabold">*</span>
            </label>
            <input
              type="number"
              name="discountPrice"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="mt-2 appearance-none block w-full mb-3 px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm  "
              placeholder="Enter your Product Price with Discount..."
            />
          </div>

          <div>
            <label htmlFor="" className="py-2">
              Product Stock
              <span className="text-red-500 font-extrabold">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-2 appearance-none block w-full mb-3 px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm  "
              placeholder="Enter your Product Stock..."
            />
          </div>

          <div>
            <label htmlFor="" className="py-2">
              Upload Images
              <span className="text-red-500 font-extrabold">*</span>
            </label>
            <input
              type="file"
              name=""
              id="upload"
              multiple
              onChange={handleImagesUpload}
              className="hidden "
            />
            <div className="w-full flex items-center mb-3 flex-wrap">
              <label htmlFor="upload">
                <AiOutlinePlusCircle
                  size={30}
                  className="mt-3 cursor-pointer"
                  color="#555"
                />
              </label>
              {images &&
                images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    className="w-[120px] h-auto object-cover m-2"
                    alt=""
                  />
                ))}
            </div>
            <div>
              <input
                type="submit"
                value="Add Product"
                className="mt-2 appearance-none bg-black text-white font-bold tracking-widest block w-full mb-3 px-3 h-9 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm cursor-pointer "
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
