"use client";
import { useState, useEffect } from "react";
import AdminTabs from "@/Components/AdminTabs/AdminTabs";
import { useAdminTabs } from "@/Components/ReUseAdminTabs/ReUseAdminTabs";
import Link from "next/link";

const UsersPage = () => {
  const { loadingInfo, isAdmin } = useAdminTabs();
  const [allUsersData, setAllUsersData] = useState([]);

  function fetchUsers() {
    fetch(`/api/users`)
      .then((resp) => resp.json())
      .then((data) => setAllUsersData(data));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loadingInfo) {
    return "Loading Info...";
  }
  if (!isAdmin) {
    return "Can't view Content..You are not an adminstrator";
  }
  return (
    <section>
      <AdminTabs isAdmin={isAdmin} />
      <div className="glassmorphism max-w-2xl m-auto ">
        {allUsersData?.length > 0 &&
          allUsersData.map((user) => (
            <div key={user._id} className="form_input flex gap-4 items-center ">
              <div className="grow md:grid grid-cols-2 gap-4   ">
                {user.name && (
                  <span className="font-semibold">{user.name}</span>
                )}
                {!user.name && <span className="font-semibold">No name</span>}
                {user.email && (
                  <span className="text-slate-50">{user.email}</span>
                )}
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/users/${user._id}`}
                  className="style_learnbtn hover:bg-green-600 "
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="style_learnbtn hover:bg-green-600 "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UsersPage;
