"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import AdminTabs from "@/Components/AdminTabs/AdminTabs";
import HandlePhotoChange from "@/Components/HandlePhotoChange/HandlePhotoChange";
import ReUseProfileForm from "@/Components/ReUseProfileForm/ReUseProfileForm";
const ProfilePage = () => {
  const session = useSession();
  const { status } = session;
  const [user, setUser] = useState(null);
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`/api/profile`)
        .then((resp) => resp.json())
        .then((data) => {
          data && setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
    }
  }, [session, status]);

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const handleProfileUpdate = async (e, data) => {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const resp = await fetch(`/api/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

  return (
    <section>
      <h1 className="gradient_text mb-6 text-center ">{userName} Profile</h1>
      <AdminTabs isAdmin={isAdmin} />

      <ReUseProfileForm user={user} handleProfileUpdate={handleProfileUpdate} />
    </section>
  );
};

export default ProfilePage;
