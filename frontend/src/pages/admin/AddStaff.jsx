import { useEffect, useState } from "react";
import {
UserPlus,
Search,
Filter,
Edit,
Trash2,
RotateCcw,
Users
} from "lucide-react";

// const API = "http://localhost:4000";
const API = "https://project-backend-cgtf.onrender.com";

const AddStaff = () => {

const token = localStorage.getItem("token");

const [staffList,setStaffList] = useState([]);
const [filteredStaff,setFilteredStaff] = useState([]);
const [loading,setLoading] = useState(false);

const [search,setSearch] = useState("");
const [departmentFilter,setDepartmentFilter] = useState("");

const [form,setForm] = useState({
email:"",
password:"",
department:"",
});

const [editEmail,setEditEmail] = useState(null);

const headers = {
"Content-Type":"application/json",
Authorization:`Bearer ${token}`,
};


/* FETCH STAFF */

const fetchStaff = async()=>{

try{

setLoading(true);

const res = await fetch(`${API}/admin/staff`,{ headers });

const data = await res.json();

setStaffList(data);
setFilteredStaff(data);

setLoading(false);

}catch(err){
console.error(err);
setLoading(false);
}

};

useEffect(()=>{
fetchStaff();
},[]);


/* SEARCH + FILTER */

useEffect(()=>{

let filtered=[...staffList];

if(search){

filtered = filtered.filter((staff)=>
staff.email.toLowerCase().includes(search.toLowerCase())
);

}

if(departmentFilter){

filtered = filtered.filter(
(staff)=>
staff.department &&
staff.department.toLowerCase() === departmentFilter.toLowerCase()
);

}

setFilteredStaff(filtered);

},[search,departmentFilter,staffList]);


/* CREATE STAFF */

const createStaff = async(e)=>{

e.preventDefault();

if(!form.email || !form.password || !form.department){
alert("All fields are required");
return;
}

const res = await fetch(`${API}/admin/create-staff`,{
method:"POST",
headers,
body:JSON.stringify(form),
});

const data = await res.json();

if(res.ok){

alert("Staff Created Successfully");

setForm({email:"",password:"",department:""});

fetchStaff();

}else{

alert(data.message || "Failed to create staff");

}

};


/* UPDATE STAFF */

const updateStaff = async()=>{

const res = await fetch(`${API}/admin/staff/${editEmail}`,{
method:"PUT",
headers,
body:JSON.stringify({
password:form.password,
department:form.department
})
});

const data = await res.json();

if(res.ok){

alert("Staff Updated Successfully");

cancelEdit();

fetchStaff();

}else{

alert(data.message);

}

};


/* DELETE STAFF */

const deleteStaff = async(email)=>{

const confirmDelete = window.confirm(
"Are you sure you want to delete this staff?"
);

if(!confirmDelete) return;

const res = await fetch(`${API}/admin/staff/${email}`,{
method:"DELETE",
headers,
});

const data = await res.json();

if(res.ok){

alert("Staff Deleted Successfully");

fetchStaff();

}else{

alert(data.message);

}

};


/* EDIT */

const startEdit = (staff)=>{

setEditEmail(staff.email);

setForm({
email:staff.email,
password:"",
department:staff.department || "",
});

};

const cancelEdit = ()=>{

setEditEmail(null);

setForm({
email:"",
password:"",
department:"",
});

};


/* RESET FILTER */

const resetFilters = ()=>{

setSearch("");
setDepartmentFilter("");

setFilteredStaff(staffList);

};


/* DEPARTMENTS */

const departments = [
...new Set(staffList.map((s)=>s.department).filter(Boolean)),
];


/* UI */

return(

<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 md:p-10">

<h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-8 flex items-center gap-2">
<Users/> Staff Management
</h1>


{/* FORM */}

<div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mb-10 border">

<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">

<UserPlus size={20}/>

{editEmail ? "Update Staff" : "Add Staff"}

</h2>

<form
onSubmit={(e)=>{
e.preventDefault();
editEmail ? updateStaff() : createStaff(e);
}}
>

<input
type="email"
placeholder="Email"
className="w-full border p-2 mb-3 rounded-lg focus:ring-2 focus:ring-green-400"
value={form.email}
disabled={editEmail}
onChange={(e)=>
setForm({...form,email:e.target.value})
}
/>

<input
type="password"
placeholder="Password"
className="w-full border p-2 mb-3 rounded-lg focus:ring-2 focus:ring-green-400"
value={form.password}
onChange={(e)=>
setForm({...form,password:e.target.value})
}
/>

<input
type="text"
placeholder="Department"
className="w-full border p-2 mb-4 rounded-lg focus:ring-2 focus:ring-green-400"
value={form.department}
onChange={(e)=>
setForm({...form,department:e.target.value})
}
/>

<div className="flex gap-3">

<button
type="submit"
className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
>
{editEmail ? "Update Staff" : "Create Staff"}
</button>

{editEmail &&(

<button
type="button"
onClick={cancelEdit}
className="bg-gray-500 text-white px-4 py-2 rounded-lg"
>
Cancel
</button>

)}

</div>

</form>

</div>


{/* SEARCH + FILTER */}

<div className="flex gap-4 mb-6 flex-wrap items-center">

<div className="flex items-center gap-2 border p-2 rounded-lg bg-white">

<Search size={16}/>

<input
type="text"
placeholder="Search Email"
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="outline-none"
/>

</div>

<select
className="border p-2 rounded-lg bg-white"
value={departmentFilter}
onChange={(e)=>setDepartmentFilter(e.target.value)}
>

<option value="">All Departments</option>

{departments.map((dept)=>(
<option key={dept}>{dept}</option>
))}

</select>

<button
onClick={resetFilters}
className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg"
>

<RotateCcw size={16}/>
Reset

</button>

</div>


{/* STAFF COUNT */}

<p className="mb-3 text-gray-700 font-medium">

Total Staff: {filteredStaff.length}

</p>


{/* TABLE */}

<div className="bg-white rounded-2xl shadow-xl overflow-x-auto border">

<table className="w-full">

<thead className="bg-green-600 text-white">

<tr>
<th className="p-3 text-left">Email</th>
<th className="p-3 text-left">Department</th>
<th className="p-3 text-left">Actions</th>
</tr>

</thead>

<tbody>

{loading ? (

<tr>
<td colSpan="3" className="text-center p-6">
Loading staff...
</td>
</tr>

) : filteredStaff.length === 0 ? (

<tr>
<td colSpan="3" className="text-center p-6 text-gray-500">
No staff found
</td>
</tr>

) : (

filteredStaff.map((staff)=>(
<tr
key={staff.email}
className="border-t hover:bg-green-50 transition"
>

<td className="p-3">{staff.email}</td>

<td className="p-3">
{staff.department || "Not Assigned"}
</td>

<td className="p-3 flex gap-3">

<button
onClick={()=>startEdit(staff)}
className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
>
<Edit size={14}/> Edit
</button>

<button
onClick={()=>deleteStaff(staff.email)}
className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
>
<Trash2 size={14}/> Delete
</button>

</td>

</tr>
))

)}

</tbody>

</table>

</div>

</div>

);

};

export default AddStaff;