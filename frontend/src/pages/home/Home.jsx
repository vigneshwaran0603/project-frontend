
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaSearch } from "react-icons/fa";

const Home = () => {

  return (

    <div className="bg-green-50 min-h-screen">

      <Navbar />

      {/* HERO SECTION */}

      <section className="max-w-7xl mx-auto px-6 py-24 text-center">

        <h1 className="text-5xl font-bold text-green-800 mb-6 leading-tight">
          Erode Arts and Science College
        </h1>

        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Welcome to the official EASC Admission Portal. 
          Students can apply for admission online and track their application 
          status easily. Staff members can manage applications, subjects,
          and examination processes through this integrated system.
        </p>

        {/* BUTTONS */}

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">

          <Link to="/application">

            <button className="flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-green-700 transition shadow-lg">
              <FaUserGraduate />
              Apply for Admission
            </button>

          </Link>

          <Link to="/viewapplicationstatus">

            <button className="flex items-center justify-center gap-3 bg-white text-green-700 border-2 border-green-600 px-8 py-4 rounded-xl text-lg hover:bg-green-100 transition shadow">
              <FaSearch />
              View Application Status
            </button>

          </Link>

        </div>

      </section>


      {/* INFO SECTION */}

      <section className="bg-white py-16">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">

          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">

            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Online Admission
            </h3>

            <p className="text-gray-600">
              Students can apply for admission from anywhere using the online application system.
            </p>

          </div>


          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">

            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Application Tracking
            </h3>

            <p className="text-gray-600">
              Easily track the admission application status using your application number.
            </p>

          </div>


          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">

            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Student Portal
            </h3>

            <p className="text-gray-600">
              Students can view subjects, exam details, and download hall tickets online.
            </p>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="bg-green-700 text-white text-center py-6">

        <p>
          © {new Date().getFullYear()} Erode Arts and Science College | Admission Portal
        </p>

      </footer>

    </div>

  );
};

export default Home;

