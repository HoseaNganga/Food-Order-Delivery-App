"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const AdminTabs = ({ isAdmin }) => {
  const path = usePathname();

  return (
    <>
      {isAdmin && (
        <div className="tabs mb-6 max-w-lg m-auto flex gap-1 items-center justify-center flex-wrap">
          <Link
            className={path === "/profile" ? "adminActive" : ""}
            href={"/profile"}
          >
            Profile
          </Link>
          <Link
            className={path === "/categories" ? "adminActive" : ""}
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            className={/menu-items/.test(path) ? "adminActive" : ""}
            href={"/menu-items"}
          >
            Menuitems
          </Link>
          <Link
            className={/users/.test(path) ? "adminActive" : ""}
            href={"/users"}
          >
            Users
          </Link>
          <Link
            className={path === "/orders" ? "adminActive" : ""}
            href={"/orders"}
          >
            Orders
          </Link>
        </div>
      )}
    </>
  );
};

export default AdminTabs;
