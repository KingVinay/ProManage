import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import styles from "./Settings.module.css";

const Settings = () => {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (token) {
      setName(token.name);
      setEmail(token.email);
    }
  }, [token]);

  const [updateField, setUpdateField] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    let updateData = {};

    if (updateField === "name") {
      updateData = { name };
    } else if (updateField === "email") {
      updateData = { email };
    } else if (updateField === "password") {
      updateData = { oldPassword, newPassword };
    }

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/updateCredentials`,
        updateData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFieldChange = (field) => {
    setUpdateField(field);
  };

  return (
    <div className={styles.settingsContainer}>
      <Navbar option="Settings" />
      <div className={styles.settingsContent}>
        <form onSubmit={handleUpdate}>
          <h1>Settings</h1>
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={() => handleFieldChange("name")}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClick={() => handleFieldChange("email")}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              onClick={() => handleFieldChange("password")}
            />
          </div>
          <div className={styles.formGroup}>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onClick={() => handleFieldChange("password")}
            />
          </div>

          <button className={styles.button}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
