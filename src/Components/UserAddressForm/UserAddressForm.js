import React from "react";

const UserAddressForm = ({ addressProp, setAddressProp, disabled = false }) => {
  const { phone, streetAddress, postalCode, city, country } = addressProp;
  return (
    <>
      <div>
        <label className="text-base">Phone:</label>
        <input
          type="tel"
          placeholder="Phone number"
          className="form_input "
          value={phone}
          onChange={(e) => setAddressProp("phone", e.target.value)}
          disabled={disabled}
        />
      </div>
      <div>
        <label className="text-base">Address:</label>
        <input
          type="text"
          placeholder="streetAdress"
          className="form_input "
          value={streetAddress}
          onChange={(e) => setAddressProp("streetAddress", e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="flex gap-2">
        <div>
          <label className="text-base">PostalCode:</label>
          <input
            type="text"
            placeholder="Postal Code"
            className="form_input "
            value={postalCode}
            onChange={(e) => setAddressProp("postalCode", e.target.value)}
            disabled={disabled}
          />
        </div>
        <div>
          <label className="text-base">City:</label>
          <input
            type="text"
            placeholder="city"
            className="form_input "
            value={city}
            onChange={(e) => setAddressProp("city", e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
      <div>
        <label className="text-base">Country:</label>
        <input
          type="text"
          placeholder="Country"
          className="form_input "
          value={country}
          onChange={(e) => setAddressProp("country", e.target.value)}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default UserAddressForm;
