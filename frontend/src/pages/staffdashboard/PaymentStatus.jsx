import { useState } from "react";
import axios from "axios";

export default function DepartmentPaymentReport(){

const [department,setDepartment]=useState("");
const [year,setYear]=useState("");
const [semester,setSemester]=useState("");

const [report,setReport]=useState(null);

const fetchReport = async()=>{

const res = await axios.get(
"https://project-backend-kvv2.onrender.com/fees/report",
{
params:{
department,
year,
semester
},
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);

setReport(res.data);

};

return(

<div className="min-h-screen bg-green-50 p-6 md:p-10">

<h1 className="text-3xl font-bold text-green-700 mb-8">
💰 Department Payment Dashboard
</h1>


{/* FILTER SECTION */}

<div className="bg-white p-6 rounded-xl shadow-md mb-10">

<h2 className="text-lg font-semibold mb-4 text-gray-700">
Generate Department Report
</h2>

<div className="grid md:grid-cols-4 gap-4">

<input
placeholder="Department"
className="border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
onChange={(e)=>setDepartment(e.target.value)}
/>

<input
type="number"
placeholder="Year"
className="border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
onChange={(e)=>setYear(e.target.value)}
/>

<input
type="number"
placeholder="Semester"
className="border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
onChange={(e)=>setSemester(e.target.value)}
/>

<button
onClick={fetchReport}
className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
>
Generate Report
</button>

</div>

</div>


{report && (

<>

{/* STAT CARDS */}

<div className="grid md:grid-cols-3 gap-6 mb-10">

<div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
<h2 className="text-gray-600 font-medium">
👨‍🎓 Total Students
</h2>
<p className="text-4xl font-bold text-green-600 mt-2">
{report.totalStudents}
</p>
</div>

<div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
<h2 className="text-gray-600 font-medium">
✅ Paid Students
</h2>
<p className="text-4xl font-bold text-green-600 mt-2">
{report.totalPaid}
</p>
</div>

<div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
<h2 className="text-gray-600 font-medium">
❌ Unpaid Students
</h2>
<p className="text-4xl font-bold text-red-500 mt-2">
{report.totalUnpaid}
</p>
</div>

</div>


{/* PAID STUDENTS TABLE */}

<div className="bg-white rounded-xl shadow mb-10 overflow-x-auto">

<div className="p-6 border-b">
<h2 className="text-xl font-bold text-green-700">
💳 Paid Students
</h2>
</div>

<table className="w-full text-sm">

<thead className="bg-green-100 text-gray-700">

<tr>
<th className="p-3 text-left">Name</th>
<th className="p-3 text-left">Register No</th>
<th className="p-3 text-left">Email</th>
<th className="p-3 text-left">Amount</th>
<th className="p-3 text-left">Paid At</th>
</tr>

</thead>

<tbody>

{report.payments.map((p)=>(
<tr key={p._id} className="border-b hover:bg-green-50">

<td className="p-3">
{p.student?.name}
</td>

<td className="p-3">
{p.student?.registerNo}
</td>

<td className="p-3">
{p.student?.email}
</td>

<td className="p-3 font-semibold text-green-600">
₹{p.totalAmount}
</td>

<td className="p-3">
{new Date(p.paidAt).toLocaleString()}
</td>

</tr>
))}

</tbody>

</table>

</div>



{/* UNPAID STUDENTS */}

<div className="bg-white rounded-xl shadow overflow-x-auto">

<div className="p-6 border-b">
<h2 className="text-xl font-bold text-red-600">
⚠️ Unpaid Students
</h2>
</div>

<table className="w-full text-sm">

<thead className="bg-red-100 text-gray-700">

<tr>
<th className="p-3 text-left">Name</th>
<th className="p-3 text-left">Register No</th>
<th className="p-3 text-left">Email</th>
</tr>

</thead>

<tbody>

{report.unpaidStudents.map((s)=>(
<tr key={s._id} className="border-b hover:bg-red-50">

<td className="p-3">
{s.name}
</td>

<td className="p-3">
{s.registerNo}
</td>

<td className="p-3">
{s.email}
</td>

</tr>
))}

</tbody>

</table>

</div>

</>

)}

</div>

);

}