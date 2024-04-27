import React from "react";
import Image from "next/image";
import { FaCircleArrowRight } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <section className="hero mb-16 ">
      <div>
        <h2 className="text-4xl font-extrabold mb-4 leading-normal ">
          Everything is <br /> better with <br />
          <span className="gradient_text">Pizza</span>
        </h2>
        <p className="text-gray-700 mb-4">
          Pizza is the missing piece that makes every day complete,a simple yet
          delicious joy in life
        </p>
        <div className=" flex items-center gap-4 sm: justify-between ">
          <button className="style_btn flex justify-start gap-2 items-center  hover:bg-green-600 transition-all ">
            Order now
            <FaCircleArrowRight />
          </button>
          <button className="style_learnbtn flex justify-start gap-2 items-center hover:bg-green-600 transition-all">
            Learn More
            <FaCircleArrowRight />
          </button>
        </div>
      </div>
      <div className=" relative hidden sm:block ">
        <Image
          src={"/images/pizza.png"}
          alt="pizzaholderimage"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;
