"use client";
import ReUseSectionHeaders from "../ReUseSectionHeaders/ReUseSectionHeaders";
import Image from "next/image";
import { useState, useEffect } from "react";
import HomeMenuCard from "../HomeMenuCard/HomeMenuCard";

const HomeMenu = () => {
  const [bestSellers, setBestSellers] = useState([]);
  function fetchMenuItems() {
    fetch(`/api/menu-items`)
      .then((resp) => resp.json())
      .then((items) => {
        const latestItems = items.slice(-6);
        setBestSellers(latestItems);
      });
  }
  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <section className="mb-16">
      <div className="relative">
        <div className="absolute left-0 -top-20 -z-10 ">
          <Image
            src={"/images/sallad1.png"}
            alt="sallad1"
            width={108}
            height={187}
            objectFit="contain"
          />
        </div>
        <div className="absolute right-0 -top-20 -z-10 ">
          <Image
            src={"/images/sallad2.png"}
            alt="sallad2"
            width={108}
            height={196}
            objectFit="contain"
          />
        </div>
      </div>
      <ReUseSectionHeaders header1={`check out`} header2={`our best sellers`} />
      <div className="grid md:grid-cols-3 gap-4 mt-16">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => (
            <HomeMenuCard key={item._id} menuItem={item} />
          ))}
      </div>
    </section>
  );
};

export default HomeMenu;
