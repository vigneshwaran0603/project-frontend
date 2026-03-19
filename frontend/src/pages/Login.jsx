import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";

function Login() {

  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    username:"",
    password:""
  });

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{

      console.log("Login request:",formData);

      const res = await axios.post(
        "https://project-backend-cgtf.onrender.com/login",
        formData
      );

      console.log("Login response:",res.data);

      const {token,role,user} = res.data;

      localStorage.setItem("token",token);
      localStorage.setItem("role",role);

      if(user){
        localStorage.setItem("userId",user._id);
        localStorage.setItem("username",user.username);
        localStorage.setItem("user",JSON.stringify(user));
      }

      alert("Login Successful");

      if(role==="admin"){
        navigate("/admin/admindashboard");
      }
      else if(role==="staff"){
        navigate("/staffdashboard/staffdashboard");
      }
      else if(role==="student"){
        navigate("/student/studentdashboard");
      }

    }catch(err){

      console.error("Login error:",err);

      if(err.response){
        alert(err.response.data.message || "Login Failed");
      }else{
        alert("Server Error");
      }

    }
  };

  return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">

  <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 transition hover:shadow-2xl">

    <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
      EASC Login
    </h2>

    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Username */}

      <div className="relative">

        <User className="absolute left-3 top-3 text-gray-400" size={20}/>

        <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        required
        />

      </div>

      {/* Password */}

      <div className="relative">

        <Lock className="absolute left-3 top-3 text-gray-400" size={20}/>

        <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        required
        />

      </div>

      {/* Login Button */}

      <button
      className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 shadow-md hover:shadow-lg">
        Login
      </button>

    </form>

    {/* Footer */}

    <p className="text-center text-sm text-gray-500 mt-6">
      EASC Login Portal
    </p>

  </div>

</div>

  );
}

export default Login;