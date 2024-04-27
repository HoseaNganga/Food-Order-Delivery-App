"use client";
import { useState, useEffect } from "react";
import HomeMenuCard from "@/Components/HomeMenuCard/HomeMenuCard";
import ReUseSectionHeaders from "@/Components/ReUseSectionHeaders/ReUseSectionHeaders";

const MenuPage = () => {
  const [menuItems, setmMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  function fetchMenuItems() {
    fetch(`/api/menu-items`)
      .then((resp) => resp.json())
      .then((menuData) => {
        setmMenuItems(menuData);
      });
  }

  function fetchCategories() {
    fetch(`/api/categories`)
      .then((resp) => resp.json())
      .then((categoryData) => {
        setCategories(categoryData);
      });
  }

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  return (
    <section>
      <ReUseSectionHeaders header1={"menu-items"} header2={"latest menu"} />
      {categories?.length > 0 &&
        categories.map((c) => (
          <div className=" glassmorphism mb-2   " key={c._id}>
            <ReUseSectionHeaders header2={c.name} />
            <div className="grid md:grid-cols-4 gap-4 mt-4">
              {menuItems
                .filter((item) => item.category === c._id)
                .map((item) => (
                  <HomeMenuCard key={item._id} menuItem={item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
};

export default MenuPage;
