"use client";

// react components
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

// global states
import { useGlobalLoading } from "@/globalStates/useGlobalLoading";
import { useGlobalAlert } from "@/globalStates/useGlobalAlert";

// components
import CurrentUser from "@/components/global/CurrentUser";

const UserProfile = () => {
  const { user } = useAuth();
  const { setLoading } = useGlobalLoading();
  const { setTranslateAlert } = useGlobalAlert();
  const [formButton, setFormButton] = useState(false);
  const currentUser = CurrentUser({});
  const [editTitle, setEditTitle] = useState("");
  const [editFullName, setEditFullName] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editState, setEditState] = useState("");
  const [editZipCode, setEditZipCode] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    number: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const editProfile = () => {
    setFormButton(!formButton);
    setFormData({
      title: "",
      fullName: "",
      number: "",
      city: "",
      state: "",
      zipCode: "",
    });
  };

  const cancelEdit = () => {
    setFormButton(false);
    setEditTitle("");
    setEditFullName("");
    setEditNumber("");
    setEditCity("");
    setEditState("");
    setEditZipCode("");
  };

  const isFormDataEmpty = () => {
    return Object.values(formData).every((value) => value === "");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Get form data
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Create an object from form data
    const data: Record<string, string> = {};
    const fieldsToUpdate = ["city", "number", "state", "title", "zipCode"];

    formData.forEach((value, key) => {
      if (fieldsToUpdate.includes(key)) {
        data[key] = value as string;
      }
    });

    // Split fullName into firstName and lastName
    const fullName = formData.get("fullName") as string;
    const [firstName, lastName] = fullName.split(" ");

    try {
      // Reference to the user's document
      const userDocRef = doc(collection(db, "authUsers"), user.uid);

      // Update the specified fields in the user's document with the form data
      await updateDoc(userDocRef, {
        ...data,
        firstName,
        lastName,
      });

      setTranslateAlert(true, "User Profile updated", "success");

      // clear the form after submission
      form.reset();
    } catch (e) {
      setTranslateAlert(true, "Error updating user document", "error");
    }

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="h-full w-full xl:w-3/6 flex flex-col items-start justify-center"
      >
        <div className="h-full w-full flex flex-col items-start justify-start gap-2 text-[15px] font-semibold">
          <div className="h-auto w-full flex items-center justify-center gap-10 p-2">
            <label
              htmlFor="title"
              className="h-auto w-full flex flex-col items-start justify-center"
            >
              Title
              <input
                id="title"
                name="title"
                autoComplete="off"
                required
                value={
                  !formButton && editTitle !== "title"
                    ? currentUser && user && currentUser.title
                    : formButton && editTitle !== "title"
                    ? currentUser && user && currentUser.title
                    : formButton && editTitle === "title" && formData.title
                }
                onChange={(e: any) =>
                  setFormData((formData) => ({
                    ...formData,
                    title: e.target.value,
                  }))
                }
                onFocus={() => formButton && setEditTitle("title")}
                readOnly={!formButton}
                className={`h-12 w-full flex flex-col items-center justify-center ${
                  formButton
                    ? "text-[#464646]"
                    : "text-[#858585] focus-within:outline-none"
                } p-4 bg-transparent border rounded-md`}
              />
            </label>
            <label
              htmlFor="fullName"
              className="h-auto w-full flex flex-col items-start justify-center"
            >
              Full Name
              <input
                id="fullName"
                name="fullName"
                autoComplete="off"
                required
                value={
                  !formButton && editFullName !== "fullName"
                    ? currentUser &&
                      user &&
                      `${currentUser.firstName} ${currentUser.lastName}`
                    : formButton && editFullName !== "fullName"
                    ? currentUser &&
                      user &&
                      `${currentUser.firstName} ${currentUser.lastName}`
                    : formButton &&
                      editFullName === "fullName" &&
                      formData.fullName
                }
                onChange={(e: any) =>
                  setFormData((formData) => ({
                    ...formData,
                    fullName: e.target.value,
                  }))
                }
                onFocus={() => formButton && setEditFullName("fullName")}
                readOnly={!formButton}
                className={`h-12 w-full flex flex-col items-center justify-center ${
                  formButton
                    ? "text-[#464646]"
                    : "text-[#858585] focus-within:outline-none"
                } p-4 bg-transparent border rounded-md`}
              />
            </label>
          </div>
          <label
            htmlFor="email"
            className="h-auto w-full flex flex-col items-start justify-center p-2"
          >
            Email
            <input
              id="email"
              name="email"
              autoComplete="off"
              required
              value={user && user.email}
              readOnly
              className="h-12 w-full flex flex-col items-center justify-center text-[#858585] bg-transparent p-4 border rounded-md focus-within:outline-none"
            />
          </label>
          <label
            htmlFor="number"
            className="h-auto w-full flex flex-col items-start justify-center p-2"
          >
            Number
            <input
              id="number"
              name="number"
              autoComplete="off"
              required
              value={
                !formButton && editNumber !== "number"
                  ? currentUser && user && currentUser.number
                  : formButton && editNumber !== "number"
                  ? currentUser && user && currentUser.number
                  : formButton && editNumber === "number" && formData.number
              }
              onChange={(e: any) =>
                setFormData((formData) => ({
                  ...formData,
                  number: e.target.value,
                }))
              }
              onFocus={() => formButton && setEditNumber("number")}
              readOnly={!formButton}
              className={`h-12 w-full flex flex-col items-center justify-center ${
                formButton
                  ? "text-[#464646]"
                  : "text-[#858585] focus-within:outline-none"
              } p-4 bg-transparent border rounded-md`}
            />
          </label>
          <label
            htmlFor="city"
            className="h-auto w-full flex flex-col items-start justify-center p-2"
          >
            City
            <input
              id="city"
              name="city"
              autoComplete="off"
              required
              value={
                !formButton && editCity !== "city"
                  ? currentUser && user && currentUser.city
                  : formButton && editCity !== "city"
                  ? currentUser && user && currentUser.city
                  : formButton && editCity === "city" && formData.city
              }
              onChange={(e: any) =>
                setFormData((formData) => ({
                  ...formData,
                  city: e.target.value,
                }))
              }
              onFocus={() => formButton && setEditCity("city")}
              readOnly={!formButton}
              className={`h-12 w-full flex flex-col items-center justify-center ${
                formButton
                  ? "text-[#464646]"
                  : "text-[#858585] focus-within:outline-none"
              } p-4 bg-transparent border rounded-md`}
            />
          </label>
          <div className="h-auto w-full flex items-center justify-center gap-10 p-2">
            <label
              htmlFor="state"
              className="h-auto w-full flex flex-col items-start justify-center"
            >
              State
              <input
                id="state"
                name="state"
                autoComplete="off"
                required
                value={
                  !formButton && editState !== "state"
                    ? currentUser && user && currentUser.state
                    : formButton && editState !== "state"
                    ? currentUser && user && currentUser.state
                    : formButton && editState === "state" && formData.state
                }
                onChange={(e: any) =>
                  setFormData((formData) => ({
                    ...formData,
                    state: e.target.value,
                  }))
                }
                onFocus={() => formButton && setEditState("state")}
                readOnly={!formButton}
                className={`h-12 w-full flex flex-col items-center justify-center ${
                  formButton
                    ? "text-[#464646]"
                    : "text-[#858585] focus-within:outline-none"
                } p-4 bg-transparent border rounded-md`}
              />
            </label>
            <label
              htmlFor="zipCode"
              className="h-auto w-full flex flex-col items-start justify-center"
            >
              Zip Code
              <input
                id="zipCode"
                name="zipCode"
                autoComplete="off"
                required
                value={
                  !formButton && editZipCode !== "zipCode"
                    ? currentUser && user && currentUser.zipCode
                    : formButton && editZipCode !== "zipCode"
                    ? currentUser && user && currentUser.zipCode
                    : formButton &&
                      editZipCode === "zipCode" &&
                      formData.zipCode
                }
                onChange={(e: any) =>
                  setFormData((formData) => ({
                    ...formData,
                    zipCode: e.target.value,
                  }))
                }
                onFocus={() => formButton && setEditZipCode("zipCode")}
                readOnly={!formButton}
                className={`h-12 w-full flex flex-col items-center justify-center ${
                  formButton
                    ? "text-[#464646]"
                    : "text-[#858585] focus-within:outline-none"
                } p-4 bg-transparent border rounded-md`}
              />
            </label>
          </div>
          <label
            htmlFor="country"
            className="h-auto w-full flex flex-col items-start justify-center p-2"
          >
            Country
            <input
              id="country"
              name="country"
              value="United States"
              autoComplete="off"
              readOnly
              className="h-12 w-full flex flex-col items-center justify-center text-[#858585] bg-transparent p-4 border rounded-md focus-within:outline-none"
            />
          </label>
        </div>
        <div className="h-full w-full flex items-center justify-end gap-20 p-2">
          {formButton && (
            <div
              onClick={cancelEdit}
              className="h-10 w-36 flex items-center justify-center font-semibold rounded hover:bg-[#fff] cursor-pointer"
            >
              Cancel
            </div>
          )}
          {formButton ? (
            <button
              type="submit"
              className="disabled:opacity-90 h-10 w-36 flex items-center justify-center text-[#fff] font-semibold bg-[#7d1f2e] rounded hover:bg-[#701b29]"
              disabled={isFormDataEmpty()}
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              onClick={editProfile}
              className="h-10 w-36 flex items-center justify-center text-[#fff] font-semibold bg-[#7d1f2e] rounded hover:bg-[#701b29]"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default UserProfile;
