
import { useState } from "react";
import { FaBars, FaTimes, FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {

  const [open, setOpen] = useState(false);

  return (

    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2 text-green-700 font-bold text-xl"
        >
          <FaUniversity className="text-green-600 text-2xl" />
          EASC Portal
        </Link>

        {/* Desktop Menu */}

        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <li>
            <Link
              to="/"
              className="hover:text-green-600 transition"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition shadow"
            >
              Login
            </Link>
          </li>

        </ul>

        {/* Mobile Button */}

        <div
          className="md:hidden cursor-pointer text-green-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>

      </div>

      {/* Mobile Menu */}

      {open && (

        <div className="md:hidden bg-green-50 border-t">

          <ul className="flex flex-col px-6 py-4 space-y-4 text-gray-700 font-medium">

            <li>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="hover:text-green-600"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-fit"
              >
                Login
              </Link>
            </li>

          </ul>

        </div>

      )}

    </nav>
  );
};

export default Navbar;

