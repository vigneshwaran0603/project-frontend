import { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Upload,
  BookOpen
} from "lucide-react";

export default function Application() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    community: "",
    twelthMark: "",
  });

  const [marksheet, setMarksheet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [applicationNo, setApplicationNo] = useState("");

  const departments = ["CS", "ENG", "TAM", "ECO", "ZOO", "MAT", "BBA"];
  const communities = ["BC", "MBC", "SC", "SCA/ST", "DNC", "OC", "BCM"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setMarksheet(e.target.files[0]);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!marksheet) {
      setMessage("Please upload your marksheet");
      return;
    }

    if (formData.twelthMark > 600) {
      setMessage("12th mark cannot be greater than 600");
      return;
    }

    try {

      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("department", formData.department);
      data.append("community", formData.community);
      data.append("twelthMark", formData.twelthMark);
      data.append("marksheet", marksheet);

      const response = await axios.post(
        "https://project-backend-cgtf.onrender.com/application",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);

      const appNo = response.data.applicationNo;

      setApplicationNo(appNo);
      setMessage("Application submitted successfully!");

      window.alert(
        `Application submitted successfully!\n\nYour Application Number: ${appNo}\n\nSave this application number for future reference.`
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        community: "",
        twelthMark: "",
      });

      setMarksheet(null);

    } catch (error) {

      setLoading(false);
      setMessage(error.response?.data?.message || "Something went wrong");

    }

  };

  return (

<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex justify-center items-center p-4">

  <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8">

    <h2 className="text-3xl font-bold text-green-600 text-center mb-8 flex items-center justify-center gap-2">
      <GraduationCap /> College Admission Application
    </h2>

    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {/* Name */}
      <div className="relative">
        <User className="absolute left-3 top-3 text-gray-400" size={18}/>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full pl-10 border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          required
        />
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-3 text-gray-400" size={18}/>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full pl-10 border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          required
        />
      </div>

      {/* Phone */}
      <div className="relative">
        <Phone className="absolute left-3 top-3 text-gray-400" size={18}/>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full pl-10 border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          required
        />
      </div>

      {/* Department */}
      <div className="relative">
        <BookOpen className="absolute left-3 top-3 text-gray-400" size={18}/>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full pl-10 border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          required
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
      </div>

      {/* Community */}
      <select
        name="community"
        value={formData.community}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
        required
      >
        <option value="">Select Community</option>
        {communities.map((com) => (
          <option key={com} value={com}>
            {com}
          </option>
        ))}
      </select>

      {/* 12th Mark */}
      <input
        type="number"
        name="twelthMark"
        placeholder="12th Mark (Out of 600)"
        value={formData.twelthMark}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
        required
      />

      {/* File Upload */}

      <div className="md:col-span-2 border-2 border-dashed border-green-300 p-6 rounded-lg text-center hover:bg-green-50 transition">

        <Upload className="mx-auto text-green-500 mb-2" size={28}/>

        <p className="text-sm text-gray-600 mb-2">
          Upload 12th Marksheet (PDF / JPG / PNG)
        </p>

        <input
          type="file"
          name="marksheet"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.png"
          className="mx-auto"
        />

      </div>

      {/* Submit */}

      <div className="md:col-span-2">

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition shadow-md"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>

      </div>

    </form>

    {message && (

      <div className="text-center mt-6">

        <p className="text-green-600 font-semibold">
          {message}
        </p>

        {applicationNo && (
          <p className="mt-2 text-green-700 font-bold">
            Application Number: {applicationNo}
          </p>
        )}

      </div>

    )}

  </div>

</div>

  );
}