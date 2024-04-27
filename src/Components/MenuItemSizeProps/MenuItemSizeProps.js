"use client";
import { FaTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import { useState } from "react";

const MenuItemSizeProps = ({ name, buttonLabel, props, setProps }) => {
  const [chevronOpen, setChevronOpen] = useState(false);
  const handleChevron = () => {
    setChevronOpen(!chevronOpen);
  };
  const addSizes = () => {
    setProps((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  };

  const editSize = (e, index, prop) => {
    const newValue = e.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  };

  const deleteSize = (indexToDelete) => {
    setProps((prev) => prev.filter((value, index) => index !== indexToDelete));
  };
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2 grid">
      <button
        type="button"
        className="flex items-center justify-start gap-2 bg-white p-2 font-semibold text-base"
        onClick={handleChevron}
      >
        {chevronOpen && (
          <>
            <FaChevronUp />
            <span>{name}</span>
            <span>({props?.length})</span>
          </>
        )}
        {!chevronOpen && (
          <>
            <FaChevronDown />
            <span>{name}</span>
            <span>({props?.length})</span>
          </>
        )}
      </button>
      <div className={chevronOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          Array.from(props).map((size, index) => (
            <div className="flex gap-2 mb-2 items-end " key={size._id}>
              <div>
                <label className="text-base">Name:</label>
                <input
                  type="text"
                  placeholder="Size Name:"
                  value={size.name}
                  className="form_input"
                  onChange={(e) => editSize(e, index, "name")}
                />
              </div>
              <div>
                <label className="text-base">Extra Price:</label>
                <input
                  type="text"
                  placeholder="Extra Price"
                  value={size.price}
                  className="form_input"
                  onChange={(e) => editSize(e, index, "price")}
                />
              </div>
              <div className="mb-2">
                <button
                  type="button"
                  className="style_btn hover:bg-green-600  "
                  onClick={() => deleteSize(index)}
                >
                  <FaTrashCan />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          className="bg-white hover:bg-green-600 text-base font-semibold flex gap-2 items-center justify-center p-2 "
          onClick={addSizes}
        >
          <FaPlus />
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default MenuItemSizeProps;
