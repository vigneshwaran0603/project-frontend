import { useEffect, useState } from "react";
import {
DollarSign,
Calendar,
Edit,
Trash2,
PlusCircle
} from "lucide-react";

export default function FeeStructurePage() {

const [fees, setFees] = useState([]);

const [form, setForm] = useState({
department: "",
year: "",
semester: "",
tuitionFee: "",
otherFee: "",
dueDate: "",
lateFeeAmount: ""
});

const [editingId, setEditingId] = useState(null);

const token = localStorage.getItem("token");


/* ---------------- FETCH FEES ---------------- */

const fetchFees = async () => {

try {

const res = await fetch(
"http://localhost:4000/fee-structure",
{
headers:{ Authorization:`Bearer ${token}` }
}
);

const data = await res.json();

if(!res.ok){
alert("Failed to fetch fee structures");
return;
}

setFees(data);

}catch(err){
console.error(err);
}

};

useEffect(()=>{
fetchFees();
},[]);


/* ---------------- INPUT ---------------- */

const handleChange = (e)=>{

setForm({
...form,
[e.target.name]:e.target.value
});

};


/* ---------------- SUBMIT ---------------- */

const handleSubmit = async(e)=>{

e.preventDefault();

const payload={
...form,
year:Number(form.year),
semester:Number(form.semester),
tuitionFee:Number(form.tuitionFee),
otherFee:Number(form.otherFee || 0),
lateFeeAmount:Number(form.lateFeeAmount || 0)
};

try{

let res;

if(editingId){

res = await fetch(
`http://localhost:4000/fee-structure/${editingId}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify(payload)
}
);

}else{

res = await fetch(
"http://localhost:4000/fee-structure",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify(payload)
}
);

}

const data = await res.json();

if(!res.ok){
alert(data.message || "Operation failed");
return;
}

alert(editingId ? "Fee updated!" : "Fee created!");

setForm({
department:"",
year:"",
semester:"",
tuitionFee:"",
otherFee:"",
dueDate:"",
lateFeeAmount:""
});

setEditingId(null);

fetchFees();

}catch(err){
console.error(err);
}

};


/* ---------------- DELETE ---------------- */

const deleteFee = async(id)=>{

if(!window.confirm("Delete this fee structure?")) return;

try{

const res = await fetch(
`http://localhost:4000/fee-structure/${id}`,
{
method:"DELETE",
headers:{ Authorization:`Bearer ${token}` }
}
);

const data = await res.json();

if(!res.ok){
alert(data.message || "Delete failed");
return;
}

alert("Fee structure deleted");

fetchFees();

}catch(err){
console.error(err);
}

};


/* ---------------- EDIT ---------------- */

const editFee = (fee)=>{

setForm({
department:fee.department,
year:fee.year,
semester:fee.semester,
tuitionFee:fee.tuitionFee,
otherFee:fee.otherFee,
dueDate:fee.dueDate?.substring(0,10),
lateFeeAmount:fee.lateFeeAmount
});

setEditingId(fee._id);

};


/* ---------------- UI ---------------- */

return(

<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 md:p-10">

<h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-8 flex items-center gap-2">
<DollarSign/> Fee Structure Management
</h1>


{/* FORM */}

<form
onSubmit={handleSubmit}
className="bg-white p-6 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 border"
>

<input
name="department"
placeholder="Department"
value={form.department}
onChange={handleChange}
className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
/>

<input
name="year"
type="number"
placeholder="Year"
value={form.year}
onChange={handleChange}
className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
/>

<input
name="semester"
type="number"
placeholder="Semester"
value={form.semester}
onChange={handleChange}
className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
/>

<input
name="tuitionFee"
type="number"
placeholder="Tuition Fee"
value={form.tuitionFee}
onChange={handleChange}
className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
/>

<input
name="otherFee"
type="number"
placeholder="Other Fee"
value={form.otherFee}
onChange={handleChange}
className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
/>

<input
name="dueDate"
type="date"
value={form.dueDate}
onChange={handleChange}
className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
/>

<input
name="lateFeeAmount"
type="number"
placeholder="Late Fee Amount"
value={form.lateFeeAmount}
onChange={handleChange}
className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
/>

<button
className="flex items-center justify-center gap-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition col-span-1 md:col-span-2"
>
<PlusCircle size={18}/>
{editingId ? "Update Fee Structure" : "Create Fee Structure"}
</button>

</form>


{/* TABLE */}

<div className="bg-white shadow-xl rounded-2xl overflow-x-auto border">

<table className="w-full">

<thead className="bg-green-600 text-white">

<tr>
<th className="p-3">Dept</th>
<th>Year</th>
<th>Sem</th>
<th>Tuition</th>
<th>Other</th>
<th>Total</th>
<th>Due Date</th>
<th>Late Fee</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{fees.length === 0 &&(
<tr>
<td colSpan="9" className="text-center p-6 text-gray-500">
No Fee Structures Found
</td>
</tr>
)}

{fees.map((fee)=>(
<tr
key={fee._id}
className="text-center border-b hover:bg-green-50 transition"
>

<td className="p-2">{fee.department}</td>
<td>{fee.year}</td>
<td>{fee.semester}</td>
<td>₹{fee.tuitionFee}</td>
<td>₹{fee.otherFee}</td>
<td className="font-semibold text-green-700">
₹{fee.totalAmount}
</td>
<td>
<Calendar className="inline mr-1" size={14}/>
{new Date(fee.dueDate).toLocaleDateString()}
</td>
<td>₹{fee.lateFeeAmount}</td>

<td className="space-x-2">

<button
onClick={()=>editFee(fee)}
className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded items-center gap-1 inline-flex"
>
<Edit size={14}/> Edit
</button>

<button
onClick={()=>deleteFee(fee._id)}
className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded items-center gap-1 inline-flex"
>
<Trash2 size={14}/> Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

);

}