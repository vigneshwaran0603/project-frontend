import { useEffect,useState } from "react";
import axios from "axios";
import {
Users,
Building2,
FileText,
DollarSign
} from "lucide-react";

export default function AdminDashboard(){

const token = localStorage.getItem("token");

const [students,setStudents] = useState(0);
const [applications,setApplications] = useState(0);
const [fees,setFees] = useState(0);
const [departments,setDepartments] = useState(0);

useEffect(()=>{
fetchStats();
},[]);

const fetchStats = async()=>{

const studentRes = await axios.get(
"http://localhost:4000/staff/students",
{ headers:{ Authorization:`Bearer ${token}` } }
);

setStudents(studentRes.data.length);

const deptSet = new Set(
studentRes.data.map(s=>s.department)
);

setDepartments(deptSet.size);

};

return(

<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 md:p-10">

<h1 className="text-3xl md:text-4xl font-bold mb-10 text-green-700">
Admin Statistics
</h1>

{/* STATS GRID */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

{/* STUDENTS */}

<div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition">

<div>
<p className="text-gray-500">Total Students</p>
<p className="text-3xl font-bold text-green-700">
{students}
</p>
</div>

<div className="bg-green-100 p-3 rounded-xl text-green-600">
<Users size={28}/>
</div>

</div>


{/* DEPARTMENTS */}

<div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition">

<div>
<p className="text-gray-500">Departments</p>
<p className="text-3xl font-bold text-green-700">
{departments}
</p>
</div>

<div className="bg-green-100 p-3 rounded-xl text-green-600">
<Building2 size={28}/>
</div>

</div>


{/* APPLICATIONS */}

<div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition">

<div>
<p className="text-gray-500">Applications</p>
<p className="text-3xl font-bold text-green-700">
{applications}
</p>
</div>

<div className="bg-green-100 p-3 rounded-xl text-green-600">
<FileText size={28}/>
</div>

</div>


{/* FEES */}

<div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition">

<div>
<p className="text-gray-500">Fees Collected</p>
<p className="text-3xl font-bold text-green-700">
₹{fees}
</p>
</div>

<div className="bg-green-100 p-3 rounded-xl text-green-600">
<DollarSign size={28}/>
</div>

</div>

</div>

</div>

);

}