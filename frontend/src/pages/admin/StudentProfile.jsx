import { useEffect,useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import {
User,
Mail,
Phone,
GraduationCap,
Calendar,
Hash,
ArrowLeft
} from "lucide-react";

export default function StudentProfile(){

const { registerNo } = useParams();
const navigate = useNavigate();

const API = "https://project-backend-cgtf.onrender.com";
const token = localStorage.getItem("token");

const [student,setStudent] = useState(null);

useEffect(()=>{
fetchStudent();
},[]);

const fetchStudent = async()=>{

try{

const res = await axios.get(
`${API}/staff/students/registerNo/${registerNo}`,
{
headers:{ Authorization:`Bearer ${token}` }
}
);

setStudent(res.data);

}catch(err){
console.error(err);
}

};

if(!student){

return(
<div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
Loading Student...
</div>
);

}

return(

<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 md:p-10">

{/* Back Button */}

<button
onClick={()=>navigate(-1)}
className="flex items-center gap-2 mb-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
>
<ArrowLeft size={18}/>
Back
</button>

<h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-8">
Student Profile
</h1>

<div className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl mx-auto border">

{/* Avatar */}

<div className="flex flex-col items-center mb-8">

<div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow">

<User size={40}/>

</div>

<h2 className="text-2xl font-semibold mt-4 text-gray-800">
{student.name}
</h2>

<p className="text-gray-500">
{student.registerNo}
</p>

</div>

{/* Student Details */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">

<div className="flex items-center gap-3">
<Hash className="text-green-600"/>
<div>
<p className="text-sm text-gray-500">Register No</p>
<p className="font-semibold">{student.registerNo}</p>
</div>
</div>

<div className="flex items-center gap-3">
<Mail className="text-green-600"/>
<div>
<p className="text-sm text-gray-500">Email</p>
<p className="font-semibold">{student.email}</p>
</div>
</div>

<div className="flex items-center gap-3">
<Phone className="text-green-600"/>
<div>
<p className="text-sm text-gray-500">Phone</p>
<p className="font-semibold">{student.phone}</p>
</div>
</div>

<div className="flex items-center gap-3">
<GraduationCap className="text-green-600"/>
<div>
<p className="text-sm text-gray-500">Department</p>
<p className="font-semibold">{student.department}</p>
</div>
</div>

<div className="flex items-center gap-3">
<GraduationCap className="text-green-600"/>
<div>
<p className="text-sm text-gray-500">Year</p>
<p className="font-semibold">{student.year}</p>
</div>
</div>

<div className="flex items-center gap-3">
<GraduationCap className="text-green-600"/>
<div>
<p className="text-sm text-gray-500">Semester</p>
<p className="font-semibold">{student.sem}</p>
</div>
</div>

<div className="flex items-center gap-3">
<Calendar className="text-green-600"/>
<div>
<p className="text-sm text-gray-500">Date of Birth</p>
<p className="font-semibold">{student.dob}</p>
</div>
</div>

<div className="flex items-center gap-3">
<User className="text-green-600"/>
<div>
<p className="text-sm text-gray-500">Role</p>
<p className="font-semibold">{student.role}</p>
</div>
</div>

<div className="flex items-center gap-3">
<Calendar className="text-green-600"/>
<div>
<p className="text-sm text-gray-500">Created</p>
<p className="font-semibold">
{new Date(student.createdAt).toLocaleDateString()}
</p>
</div>
</div>

</div>

</div>

</div>

);

}