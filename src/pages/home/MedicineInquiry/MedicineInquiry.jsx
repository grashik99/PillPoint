import React, { useState } from "react";
import Swal from "sweetalert2";

export default function MedicineInquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    medicineName: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Medicine Inquiry Submitted:", formData);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your inquiry has been submitted successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      medicineName: "",
      message: "",
    });
  };

  return (<div className="border-t mt-2">
    <div className="max-w-3xl mx-auto my-10 p-6  shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        Medicine Inquiry
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {/* Full Name */}
        <div>
          <label className="block  font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block  font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block  font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Medicine Name */}
        <div>
          <label className="block  font-medium mb-1">Medicine Name</label>
          <input
            type="text"
            name="medicineName"
            value={formData.medicineName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Message / Question */}
        <div className="lg:col-span-2">
          <label className="block  font-medium mb-1">Message / Question</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Submit Inquiry
          </button>
        </div>
      </form>
    </div></div>
  );
}
