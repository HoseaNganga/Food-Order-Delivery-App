"use client";
import { useParams } from "next/navigation";
import AdminTabs from "@/Components/AdminTabs/AdminTabs";
import { useAdminTabs } from "@/Components/ReUseAdminTabs/ReUseAdminTabs";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import toast from "react-hot-toast";
import ReUseProfileForm from "@/Components/ReUseProfileForm/ReUseProfileForm";

const EditUserInfo = () => {
  const { id } = useParams();
  const { loadingInfo, isAdmin } = useAdminTabs();
  const [user, setUser] = useState(null);

  function fetchUserData() {
    fetch(`/api/users`)
      .then((resp) => resp.json())
      .then((data) => {
        const userData = data.find((user) => user._id === id);
        setUser(userData);
      });
  }

  useEffect(() => {
    fetchUserData();
  }, []);
  const handleProfileUpdate = async (e, data) => {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const resp = await fetch(`/api/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (resp.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Updating Profile Info...",
      success: "Profile Successfully Updated..",
      error: "Error",
    });
  };

  if (loadingInfo) {
    return "Loading Info...";
  }
  if (!isAdmin) {
    return "Can't View Content..You are not an administrator";
  }
  return (
    <section>
      <AdminTabs isAdmin={isAdmin} />
      <div className="mt-8 mb-4 max-w-md m-auto ">
        <Link
          className="style_learnbtn flex gap-2 items-center justify-center hover:bg-green-600"
          href={"/users"}
        >
          <FaArrowLeft />
          Click here to view all Users
        </Link>
        <ReUseProfileForm
          user={user}
          handleProfileUpdate={handleProfileUpdate}
        />
      </div>
    </section>
  );
};

export default EditUserInfo;
