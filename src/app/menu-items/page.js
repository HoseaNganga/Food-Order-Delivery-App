"use client";
import { useState, useEffect } from "react";
import { useAdminTabs } from "@/Components/ReUseAdminTabs/ReUseAdminTabs";
import AdminTabs from "@/Components/AdminTabs/AdminTabs";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";

const MenuItems = () => {
  const { loadingInfo, isAdmin } = useAdminTabs();
  const [menuItemData, setMenuItemData] = useState([]);

  useEffect(() => {
    fetch(`/api/menu-items`)
      .then((resp) => resp.json())
      .then((data) => {
        data && setMenuItemData(data);
      });
  }, []);

  if (loadingInfo) {
    return "Loading Info...";
  }
  if (!isAdmin) {
    return "Not an Administrator..You can't view this page";
  }
  return (
    <section>
      <AdminTabs isAdmin={isAdmin} />
      <div className="mt-8 max-w-2xl m-auto ">
        <Link
          className="style_learnbtn flex gap-2 items-center justify-center hover:bg-green-600"
          href={"/menu-items/create"}
        >
          Click here to Create new Menu Item
          <FaArrowRight />
        </Link>
      </div>
      <div className="max-w-2xl m-auto mt-8">
        <h2>Edit Category:</h2>
        <div className="mt-2 glassmorphism max-w-2xl m-auto grid grid-cols-3 gap-6">
          {menuItemData?.length > 0 &&
            menuItemData.map((item) => (
              <Link
                key={item._id}
                className="form_input hover:bg-green-600"
                href={`/menu-items/edit/${item._id}`}
              >
                <div className=" flex flex-col justify-center ">
                  <div className="relative mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="text-center font-semibold">{item.name}</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MenuItems;
