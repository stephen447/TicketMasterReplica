import React, { useState } from "react";
import { PersonalInfo } from "../types";

interface PersonalInfoFormProps {
  onNext: (data: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onNext }) => {
  const [formData, setFormData] = useState<PersonalInfo>({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
      <div className="mb-4">
        <label className="block font-semibold">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default PersonalInfoForm;
