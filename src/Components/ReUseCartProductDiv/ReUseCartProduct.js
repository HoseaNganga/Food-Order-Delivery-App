import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import Image from "next/image";
import { cartProductPrice } from "../AppContext/AppProvider";
const ReUseCartProduct = ({ product, removeCartProduct }) => {
  return (
    <div
      key={product.name}
      className="flex gap-4 mb-2 border-b py-2 items-center form_input hover:bg-slate-300 "
    >
      <div className="w-24">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
        />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.extras && (
          <div className="text-gray-600 font-medium">
            Size: <span>{product.extras.name}</span>
          </div>
        )}
        {product.size?.length > 0 && (
          <div className="text-gray-600 font-medium">
            {product.size.map((size) => (
              <div key={size._id}>
                Extra {size.name}:${size.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="font-semibold">${cartProductPrice(product)}</div>
      {!!removeCartProduct && (
        <div>
          <button
            type="button"
            className="style_btn hover:bg-green-600"
            onClick={() => removeCartProduct(index)}
          >
            <FaTrashCan />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReUseCartProduct;
