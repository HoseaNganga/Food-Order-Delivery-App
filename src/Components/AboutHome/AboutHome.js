import React from "react";
import ReUseSectionHeaders from "../ReUseSectionHeaders/ReUseSectionHeaders";

const AboutHome = () => {
  return (
    <section id="about">
      <ReUseSectionHeaders header1={"our story"} header2={"about us"} />
      <div className="text-gray-600 max-w-2xl m-auto text-center grid gap-6 mt-6">
        <p className="leading-normal">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi, a
          temporibus laboriosam aspernatur quod sint optio unde, error iste
          maxime fuga praesentium est fugiat, magnam inventore. Ea sit
          asperiores similique.
        </p>
        <p className="leading-normal">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque
          corrupti nihil est aperiam error commodi laborum et quod! Dolorum et
          ducimus, blanditiis iusto magnam maiores dolore ex vel quaerat animi.
        </p>
      </div>
    </section>
  );
};

export default AboutHome;
