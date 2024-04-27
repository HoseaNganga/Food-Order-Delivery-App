"use client";
import ReUseSectionHeaders from "@/Components/ReUseSectionHeaders/ReUseSectionHeaders";
import { useState, useEffect } from "react";
import AdminTabs from "@/Components/AdminTabs/AdminTabs";
import { useAdminTabs } from "@/Components/ReUseAdminTabs/ReUseAdminTabs";
import { dbTimeForHuman } from "@/lib/datetime";
import Link from "next/link";

const OrderList = () => {
  const { isAdmin, loadingInfo } = useAdminTabs();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`/api/orders`)
      .then((resp) => resp.json())
      .then((data) => {
        setOrders(data.reverse());
      });
  }, []);

  if (loadingInfo) {
    return "Loading Info...";
  }
  if (!isAdmin) {
    return "Can't view content..You are not an adminstrator";
  }

  return (
    <section>
      <AdminTabs isAdmin={isAdmin} />
      <ReUseSectionHeaders header2={"orders"} />
      <div className="max-w-2xl mt-6 glassmorphism mx-auto ">
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className=" form_input font-semibold hover:bg-slate-300 flex gap-8 cursor-pointer items-center  flex-wrap "
            >
              <div>
                <p>{order.userEmail}</p>
              </div>
              <div
                className={
                  (order.paid ? "bg-green-500" : "bg-red-600") +
                  "  rounded-md text-white w-24 text-center grid items-center"
                }
              >
                {order.paid ? "Paid" : "Not paid"}
              </div>
              <p>{dbTimeForHuman(order.createdAt)}</p>

              <div>
                <Link
                  href={`/orders/${order._id}`}
                  className="style_learnbtn hover:bg-green-600"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default OrderList;
