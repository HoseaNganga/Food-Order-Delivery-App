import { useContext, useState } from "react";
import { CartContext } from "../AppContext/AppProvider";
import toast from "react-hot-toast";
import HomeMenuCardTile from "../HomeMenuCardTile/HomeMenuCardTile";
import Image from "next/image";

const HomeMenuCard = (menuItem) => {
  const { addToCart } = useContext(CartContext);
  const itemData = menuItem.menuItem;
  const {
    image,
    name,
    description,
    price,
    sizes,
    extraIngredients,
    _id,
    category,
  } = itemData;

  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  function handleExtras(e, extra) {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extra]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((i) => i.name !== extra.name);
      });
    }
  }

  let selectedPrice = price;

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  function handleAddToCart() {
    const hasOptions = sizes.length > 0 || extraIngredients.length > 0;
    if (hasOptions && !showPopUp) {
      setShowPopUp(true);
      return;
    }
    addToCart(itemData, selectedExtras, selectedSize);
    setShowPopUp(false);
    toast.success(`Added to Cart!`);
  }

  return (
    <>
      {showPopUp && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center "
          onClick={() => setShowPopUp(false)}
        >
          <div className="bg-white p-4 rounded-lg max-w-md ">
            <div
              className="overflow-y-scroll p-1"
              style={{ maxHeight: "calc(100vh - 100px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image}
                alt={name}
                width={200}
                height={200}
                className="mx-auto"
              />
              <h2 className="text-base font-bold text-center mb-2 ">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2 ">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className=" p-2 bg-gray-200 ">
                  <h3 className=" text-base text-center font-semibold">
                    Select size
                  </h3>

                  {sizes.map((size) => (
                    <label
                      className=" py-1  text-base flex items-center gap-1 mb-1 border "
                      key={size._id}
                    >
                      <input
                        type="radio"
                        name="size"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                      />
                      {size.name} ${price + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredients?.length > 0 && (
                <div className=" p-2 bg-gray-200 mb-2 ">
                  <h3 className=" text-base text-center font-semibold">
                    Select Extras
                  </h3>
                  {extraIngredients.map((extra) => (
                    <label
                      className=" py-1  text-base flex items-center gap-1 mb-1 border "
                      key={extra._id}
                    >
                      <input
                        type="checkbox"
                        name={extra.name}
                        onChange={(e) => handleExtras(e, extra)}
                        checked={selectedExtras
                          .map((e) => e._id)
                          .includes(extra._id)}
                      />
                      {extra.name} ${extra.price}
                    </label>
                  ))}
                </div>
              )}
              <button
                type="button"
                className="style_btn hover:bg-green-600 w-full mb-2 sticky bottom-2"
                onClick={handleAddToCart}
              >
                Add to Cart ${selectedPrice}
              </button>
              <button
                type="button"
                className="style_btn hover:bg-green-600 w-full mb-2 "
                onClick={() => setShowPopUp(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <HomeMenuCardTile handleAddToCart={handleAddToCart} {...itemData} />
    </>
  );
};

export default HomeMenuCard;
