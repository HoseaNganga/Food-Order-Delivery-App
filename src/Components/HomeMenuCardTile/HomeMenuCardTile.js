const HomeMenuCardTile = ({ handleAddToCart, ...item }) => {
  const { image, name, description, price, sizes, extraIngredients, _id } =
    item;
  return (
    <div className="grid justify-center bg-slate-400 rounded-lg text-center gap-4 p-2 cursor-pointer hover:bg-slate-300 hover:shadow-md hover:shadow-black transition-all ">
      <img
        src={image}
        alt="pizza"
        className="block m-auto"
        width={200}
        height={150}
      />
      <h4 className="font-semibold">{name}</h4>
      <p className="text-sm line-clamp-4 ">{description}</p>
      <button
        className="style_btn block m-auto hover:bg-green-600 transition-all"
        onClick={handleAddToCart}
        type="button"
      >
        {sizes?.length > 0 || extraIngredients?.length > 0 ? (
          <span>From ${price}</span>
        ) : (
          <span>Add to cart ${price}</span>
        )}
      </button>
    </div>
  );
};

export default HomeMenuCardTile;
