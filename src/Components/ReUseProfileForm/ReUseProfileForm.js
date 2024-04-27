"use client";
import HandlePhotoChange from "../HandlePhotoChange/HandlePhotoChange";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import UserAddressForm from "../UserAddressForm/UserAddressForm";
const ReUseProfileForm = ({ user, handleProfileUpdate }) => {
  const [editUserName, setEditUserName] = useState(user?.name || "");
  const [userImage, setUserImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [userEmail, setUserEmail] = useState(user?.email || "");

  function handleAddressChange(propName, val) {
    if (propName === "phone") setPhone(val);
    if (propName === "streetAddress") setStreetAddress(val);
    if (propName === "postalCode") setPostalCode(val);
    if (propName === "city") setCity(val);
    if (propName === "country") setCountry(val);
  }

  return (
    <div className="glassmorphism max-w-lg m-auto">
      <div className="md:flex gap-4 ">
        <div className=" bg-slate-400 p-2 max-w-[120px] rounded-lg">
          <HandlePhotoChange link={userImage} setLink={setUserImage} />
        </div>
        <form
          className="grow grid gap-4"
          onSubmit={(e) =>
            handleProfileUpdate(e, {
              name: editUserName,
              image: userImage,
              phone,
              streetAddress,
              postalCode,
              city,
              country,
            })
          }
        >
          <div>
            <label className="text-base">Name:</label>
            <input
              type="text"
              placeholder="first and last name"
              className="form_input "
              value={editUserName}
              onChange={(e) => setEditUserName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-base">Email:</label>
            <input
              type="email"
              value={userEmail}
              className="form_input"
              disabled={true}
            />
          </div>
          <UserAddressForm
            addressProp={{ phone, streetAddress, postalCode, city, country }}
            setAddressProp={handleAddressChange}
          />

          <button
            type="submit"
            className="style_btn w-full  hover:bg-green-600 transition-all"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReUseProfileForm;
