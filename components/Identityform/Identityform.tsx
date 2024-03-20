"use client";

import React, { useState, ChangeEventHandler } from "react";
import "./IdentityForm.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  additionalRequests: string;
  purpose: string;
  budget: string;
  expectedDelivery: string;
}

interface IdentityFormProps {
  getData: (formData: FormData) => void;
}

const IdentityForm: React.FC<IdentityFormProps> = ({ getData }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    additionalRequests: "",
    purpose: "",
    budget: "",
    expectedDelivery: "",
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    getData({ ...formData, [name]: value });
  };

  return (
    <div>
      <form className="EnquiryForm">
        <div className="form-group">
          <label htmlFor="name">Deal Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email ID: </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number: </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="additionalRequests">Additional Requests: </label>
          <input
            type="text"
            id="additionalRequests"
            name="additionalRequests"
            className="form-control"
            value={formData.additionalRequests}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="purpose">Purpose: </label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            className="form-control"
            value={formData.purpose}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="budget">Budget: </label>
          <input
            type="number"
            id="budget"
            name="budget"
            className="form-control"
            value={formData.budget}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expectedDelivery">Expected Date of Delivery: </label>
          <input
            type="date"
            id="expectedDelivery"
            name="expectedDelivery"
            className="form-control"
            value={formData.expectedDelivery}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
};

export default IdentityForm;
