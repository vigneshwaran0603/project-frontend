import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  DollarSign,
  Users,
  BarChart3
} from "lucide-react";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const modules = [
    {
      title: "Add Staff",
      description: "Create and manage staff accounts",
      path: "/admin/addstaff",
      icon: UserPlus,
    },
    {
      title: "Fee Structure",
      description: "Create, edit and delete fee structures",
      path: "/admin/feestructurepage",
      icon: DollarSign,
    },
    {
      title: "View Students",
      description: "View, edit and delete students",
      path: "/admin/viewstudents",
      icon: Users,
    },
    {
      title: "Statistics",
      description: "View all statistics",
      path: "/admin/statistics",
      icon: BarChart3,
    },
  ];

  return (

<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 md:p-10">

  {/* Header */}

  <div className="mb-10">
    <h1 className="text-3xl md:text-4xl font-bold text-green-700">
      Admin Dashboard
    </h1>

    <p className="text-gray-600 mt-2">
      Manage staff, students, fees and system statistics
    </p>
  </div>

  {/* Module Cards */}

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">

    {modules.map((module, index) => {

      const Icon = module.icon;

      return (

        <div
          key={index}
          onClick={() => navigate(module.path)}
          className="group cursor-pointer bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >

          {/* Icon */}

          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 text-green-600 mb-4 group-hover:bg-green-500 group-hover:text-white transition">

            <Icon size={26} />

          </div>

          {/* Title */}

          <h2 className="text-xl font-semibold text-gray-800">
            {module.title}
          </h2>

          {/* Description */}

          <p className="text-gray-500 mt-2 text-sm">
            {module.description}
          </p>

          {/* Button */}

          <button className="mt-5 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow-sm">
            Open
          </button>

        </div>

      );

    })}

  </div>

</div>

  );
};

export default AdminDashboard;