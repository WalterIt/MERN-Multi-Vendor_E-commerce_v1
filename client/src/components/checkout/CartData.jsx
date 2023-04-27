const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(orderData?.subTotalPrice)}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice
            ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(orderData.discountPrice)
            : "-"}
        </h5>
      </div>
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="text-[16px] font-[600] text-[#000000] pt-2 uppercase tracking-widest">
          Total:
        </h3>
        <h5 className="text-[18px] font-[600] text-end pt-3">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(orderData?.totalPrice)}
        </h5>
      </div>
      <br />
    </div>
  );
};

export default CartData;
