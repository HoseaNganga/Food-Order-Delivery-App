"use client";
import AdminTabs from "@/Components/AdminTabs/AdminTabs";
import { useAdminTabs } from "@/Components/ReUseAdminTabs/ReUseAdminTabs";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { redirect } from "next/navigation";
import HandlePhotoChange from "@/Components/HandlePhotoChange/HandlePhotoChange";
import MenuItemSizeProps from "@/Components/MenuItemSizeProps/MenuItemSizeProps";

const EditMenuPage = () => {
  const { loadingInfo, isAdmin } = useAdminTabs();
  const [completed, setCompleted] = useState(false);
  const [itemImage, setItemImage] = useState("");
  const [menuItemName, setMenuItemName] = useState("");
  const [menuItemDescription, setMenuItemDescription] = useState("");
  const [menuItemPrice, setMenuItemPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [extraIngredients, setExtraIngredients] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");

  const { id } = useParams();

  function fetchMenuItems() {
    fetch(`/api/menu-items`)
      .then((resp) => resp.json())
      .then((data) => {
        const menu_Item = data.find((item) => item._id === id);
        setItemImage(menu_Item.image);
        setMenuItemName(menu_Item.name);
        setMenuItemDescription(menu_Item.description);
        setMenuItemPrice(menu_Item.price);
        setSizes(menu_Item.sizes),
          setExtraIngredients(menu_Item.extraIngredients);
        setCategory(menu_Item.category);
      });
  }

  function fetchCategories() {
    fetch(`/api/categories`)
      .then((resp) => resp.json())
      .then((data) => {
        setCategoryList(data);
      });
  }
  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: menuItemName,
      image: itemImage,
      description: menuItemDescription,
      price: menuItemPrice,
      _id: id,
      sizes: sizes,
      extraIngredients: extraIngredients,
      category: category,
    };
    const menuItemPromise = new Promise(async (resolve, reject) => {
      const resp = await fetch(`/api/menu-items`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (resp.ok) {
        resolve();
        setCompleted(true);
      } else {
        reject();
      }
    });
    toast.promise(menuItemPromise, {
      loading: "Updating Menu Item... ",
      success: "Successfuly updated Menu Item",
      error: "Error",
    });
  };

  const handleDeleteMenuItem = async (id) => {
    const deleteMenuPromise = new Promise(async (resolve, reject) => {
      const resp = await fetch(`/api/menu-items?id=${id}`, {
        method: "DELETE",
      });

      if (resp.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(deleteMenuPromise, {
      loading: "Deleting Menu Item...",
      success: "Successfuly deleted Menu Item",
      error: "Error",
    });
    setCompleted(true);
  };

  if (completed) {
    return redirect("/menu-items");
  }

  if (loadingInfo) {
    return "Loading Info...";
  }
  if (!isAdmin) {
    return "Can't view Content...You are not an adminstrator";
  }
  return (
    <section>
      <AdminTabs isAdmin={isAdmin} />
      <div className="mt-8 max-w-md m-auto ">
        <Link
          className="style_learnbtn flex gap-2 items-center justify-center hover:bg-green-600"
          href={"/menu-items"}
        >
          <FaArrowLeft />
          Click here to view all Menu Items
        </Link>
      </div>
      <form
        className="glassmorphism max-w-md m-auto mt-8"
        onSubmit={handleFormSubmit}
      >
        <div className="md:flex gap-4">
          <div className=" bg-slate-400 p-4 max-w-[120px] rounded-lg">
            <HandlePhotoChange link={itemImage} setLink={setItemImage} />
          </div>
          <div className="grow">
            <div>
              <label>Item Name:</label>
              <input
                type="text"
                className="form_input"
                value={menuItemName}
                onChange={(e) => setMenuItemName(e.target.value)}
              />
            </div>
            <div>
              <label>Description:</label>
              <input
                type="text"
                className="form_input"
                value={menuItemDescription}
                onChange={(e) => setMenuItemDescription(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>Price:</label>
              <input
                type="number"
                className="form_input"
                value={menuItemPrice}
                onChange={(e) => setMenuItemPrice(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label>Category:</label>
              <select
                className="form_input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryList?.length > 0 &&
                  categoryList.map((c) => (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <MenuItemSizeProps
              props={sizes}
              setProps={setSizes}
              name={"Sizes"}
              buttonLabel={"Add Item Size "}
            />
            <MenuItemSizeProps
              name={"Extra Ingredients"}
              buttonLabel={"Add Extras"}
              props={extraIngredients}
              setProps={setExtraIngredients}
            />

            <button
              type="submit"
              className="style_btn hover:bg-green-600 w-full mb-2"
            >
              Edit
            </button>
            <button
              type="button"
              className="style_learnbtn hover:bg-green-600 w-full"
              onClick={() => handleDeleteMenuItem(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EditMenuPage;
