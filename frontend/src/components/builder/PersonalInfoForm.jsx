import React, { useState } from "react";
import cities from "../utildata/cities";
import countries from "../utildata/countries";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

function PersonalInfoForm() {
  const cityList = cities;
  const countryList = countries;

  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#374151", // gray-700
      borderRadius: "0.5rem",
      borderColor: state.isFocused ? "#3b82f6" : "#4b5563", // blue-500 or gray-600
      boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "none",
      padding: "2px 4px",
      minHeight: "48px",
      cursor: "pointer",
      color: "#f3f4f6", // gray-100
      "&:hover": {
        borderColor: "#3b82f6"
      }
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "#374151", // gray-700
      borderRadius: "0.5rem",
      overflow: "hidden",
      marginTop: "6px",
      border: "1px solid #4b5563", // gray-600
      zIndex: 9999,
      maxHeight: "200px" // Limit menu height
    }),

    menuList: (base) => ({
      ...base,
      maxHeight: "200px", // Limit scrollable area
      backgroundColor: "#374151" // gray-700
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#3b82f6" // blue-500
        : state.isFocused
          ? "#4b5563" // gray-600
          : "#374151", // gray-700
      color: state.isSelected ? "white" : "#f3f4f6", // gray-100
      padding: "10px 14px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: state.isSelected ? "#3b82f6" : "#4b5563"
      }
    }),

    placeholder: (base) => ({
      ...base,
      color: "#9ca3af" // gray-400
    }),

    singleValue: (base) => ({
      ...base,
      color: "#f3f4f6" // gray-100
    }),

    input: (base) => ({
      ...base,
      color: "#f3f4f6" // gray-100
    })
  };

  function onSubmit(data) {
    console.log(data);
  }

  const [socialLinks, setSocialLinks] = useState([{ "name": "", "link": "" }]);
  const addFieldHandler = () => {
    setSocialLinks((state) => {
      console.log(state);
      return [...state, { "name": "", "link": "" }]
    })
  }
  const deleteFieldHanlder = () => {
    setSocialLinks((state) => {
      const newArray = [...state]; // copy first
      newArray.pop();              // safe remove one element
      return newArray;
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
              Personal Information
            </h1>
            <p className="text-gray-400 text-sm">Fill in your details to create your resume</p>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your full name"
              {...register("fullName", {
                required: "Full name is required",
              })}
            />
            {errors.fullName && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                <span>⚠</span> {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Professional Tagline */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
              Professional Tagline <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="AI & Full Stack Developer"
              {...register("title")}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="your.email@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                <span>⚠</span> {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
              Phone <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your phone number"
              maxLength={15}
              {...register("phone", {
                required: "Phone number is required",
                maxLength: { value: 15, message: "Enter Valid Phone Number" },
                pattern: {
                  value: /^\+?[0-9]+(\s[0-9]+)*$/,
                  message: "Only digits allowed"
                }
              })}
            />
            {errors.phone && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                <span>⚠</span> {errors.phone.message}
              </span>
            )}
          </div>

          {/* City & Country in Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* City */}
            <div className="space-y-2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-300">
                City <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cityList}
                    styles={customStyles}
                    placeholder="Select your city"
                    menuPlacement="auto"
                    menuPosition="fixed"
                  />
                )}
              />
              {errors.city && (
                <span className="text-red-400 text-sm flex items-center gap-1">
                  <span>⚠</span> {errors.city.message}
                </span>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-300">
                Country <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countryList}
                    styles={customStyles}
                    placeholder="Select your country"
                    menuPlacement="auto"
                    menuPosition="fixed"
                  />
                )}
              />
              {errors.country && (
                <span className="text-red-400 text-sm flex items-center gap-1">
                  <span>⚠</span> {errors.country.message}
                </span>
              )}
            </div>
          </div>

          {/* portfolio website */}
          <div className="space-y-2">
            <label htmlFor="portfolio" className="block text-sm font-medium text-gray-300">
              Portfolio <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input
              type="url"
              id="portfolio"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="https//example.com"
              {...register("portfolio", {})}
            />
            {errors.portfolio && (
              <span className="text-red-400 text-sm flex items-center gap-1">
                <span>⚠</span> {errors.portfolio.message}
              </span>
            )}
          </div>

          {/* social Links */}
          <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-300"> Social Links</label>
          <div id="socialLinks">
            <div className="flex gap-5 justify-center mb-5 ">
              <p className="block text-md font-medium text-gray-300 ">Add Field </p>
              <span className="flex justify-center items-center" onClick={addFieldHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
              </span>
              <span className="flex justify-center items-center" onClick={deleteFieldHanlder}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
              </span>
            </div>
            {socialLinks.map((fields, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700 mb-4"
              >
                {/* Social Media Name */}
                <div className="flex flex-col">
                  <label
                    htmlFor={`media${idx}`}
                    className="text-sm font-medium text-gray-300"
                  >
                    Media {idx + 1} <span className="text-red-400">*</span>
                  </label>

                  <input
                    id={`media${idx}`}
                    type="text"
                    placeholder="Enter Social Media Name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 
                   rounded-lg text-gray-100 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`socialMedia${idx}`, {
                      required: {
                        value: true,
                        message: "This field is required or delete the entry",
                      },
                    })}
                  />
                  {errors[`socialMedia${idx}`] && (
                    <span className="text-red-400 text-sm flex items-center gap-1">
                      <span>⚠</span> {errors[`socialMedia${idx}`]?.message}
                    </span>
                  )}

                </div>

                {/* Link */}
                <div className="flex flex-col">
                  <label
                    htmlFor={`link${idx}`}
                    className="text-sm font-medium text-gray-300"
                  >
                    Link {idx + 1} <span className="text-red-400">*</span>
                  </label>

                  <input
                    id={`link${idx}`}
                    type="url"
                    placeholder="Enter the Link"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 
                   rounded-lg text-gray-100 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(`link${idx}`, {
                      required: {
                        value: true,
                        message: "This field is required or delete the entry",
                      },
                    })}
                  />

                  {errors[`link${idx}`] && (
                    <span className="text-red-400 text-sm flex items-center gap-1">
                      <span>⚠</span> {errors[`link${idx}`]?.message}
                    </span>
                  )}
                </div>
              </div>
            ))}

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold text-lg transition mt-4 ${isSubmitting
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              }`}
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PersonalInfoForm;