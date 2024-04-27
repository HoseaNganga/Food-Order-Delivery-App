import React from "react";
import ReUseSectionHeaders from "../ReUseSectionHeaders/ReUseSectionHeaders";

const HomeContact = () => {
  return (
    <section className="mt-16" id="contact">
      <ReUseSectionHeaders header1={"don't hesitate"} header2={"contact us"} />
      <div className="text-center mt-6">
        <a
          href="tel:+254 745 867 999"
          className="text-4xl underline font-semibold"
        >
          +254 745 867 999
        </a>
      </div>
    </section>
  );
};

export default HomeContact;
