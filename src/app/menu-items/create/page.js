"use client";
import React from "react";
import AdminTabs from "@/Components/AdminTabs/AdminTabs";
import { useAdminTabs } from "@/Components/ReUseAdminTabs/ReUseAdminTabs";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import HandlePhotoChange from "@/Components/HandlePhotoChange/HandlePhotoChange";
import { redirect } from "next/navigation";

const CreateMenuItem = () => {
  const { loadingInfo, isAdmin } = useAdminTabs();
  const [itemImage, setItemImage] = useState("");
  const [menuItemName, setMenuItemName] = useState("");
  const [menuItemDescription, setMenuItemDescription] = useState("");
  const [menuItemPrice, setMenuItemPrice] = useState("");
  const [completed, setCompleted] = useState(false);
  const handleFormSubmit = async (e) => {
    const data = {
      name: menuItemName,
      image: itemImage,
      description: menuItemDescription,
      price: menuItemPrice,
    };
    e.preventDefault();
    const menuItemPromise = new Promise(async (resolve, reject) => {
      const resp = await fetch(`/api/menu-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (resp.ok) {
        resolve();
        setCompleted(true);
      } else reject();
    });
    toast.promise(menuItemPromise, {
      loading: "Creating new Menu Item... ",
      success: "Successfuly created new Menu Item",
      error: "Error",
    });
  };

  if (loadingInfo) {
    return "Loading Info..";
  }
  if (!isAdmin) {
    return "Can't view Content..You need to be an administrator";
  }
  if (completed) {
    return redirect("/menu-items");
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
        <div className="flex gap-4 items-start">
          <div className=" bg-slate-400 p-4 max-h-48 rounded-lg">
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
            <div className=" mb-4">
              <label>Price:</label>
              <input
                type="number"
                className="form_input"
                value={menuItemPrice}
                onChange={(e) => setMenuItemPrice(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="style_btn hover:bg-green-600 w-full"
            >
              Create{" "}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreateMenuItem;
