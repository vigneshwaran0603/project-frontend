import { useState } from "react";
import { Search, CheckCircle, XCircle, Clock } from "lucide-react";

const ViewApplicationStatus = () => {
  const [applicationNo, setApplicationNo] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkStatus = async () => {
    if (!applicationNo) {
      setError("Please enter application number");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://project-backend-cgtf.onrender.com/application");
      const data = await res.json();

      const application = data.find(
        (app) => app.applicationNo === applicationNo
      );

      if (!application) {
        setError("Application not found");
        setStatus(null);
      } else {
        if (!application.status) {
          setStatus("PENDING");
        } else {
          setStatus(application.status);
        }
      }
    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-6">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Application Status
        </h2>

        {/* Input */}

        <div className="flex items-center border rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            placeholder="Enter Reference Number"
            value={applicationNo}
            onChange={(e) => setApplicationNo(e.target.value)}
            className="flex-1 p-3 outline-none"
          />
          <button
            onClick={checkStatus}
            className="bg-green-600 text-white px-4 py-3 hover:bg-green-700 transition"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Button */}

        <button
          onClick={checkStatus}
          className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Check Status
        </button>

        {/* Loading */}

        {loading && (
          <p className="text-center mt-4 text-gray-600 animate-pulse">
            Checking application...
          </p>
        )}

        {/* Error */}

        {error && (
          <p className="text-red-500 text-center mt-4 font-medium">
            {error}
          </p>
        )}

        {/* Status */}

        {status && (
          <div className="mt-6 text-center animate-fade-in">

            {status === "Selected" && (
              <div className="flex flex-col items-center text-green-600">
                <CheckCircle size={40} />
                <p className="font-bold text-lg mt-2">
                  Congratulations! You are Selected
                </p>
              </div>
            )}

            {status === "Rejected" && (
              <div className="flex flex-col items-center text-red-600">
                <XCircle size={40} />
                <p className="font-bold text-lg mt-2">
                  Sorry! Your application was Rejected
                </p>
              </div>
            )}

            {status === "PENDING" && (
              <div className="flex flex-col items-center text-yellow-600">
                <Clock size={40} />
                <p className="font-bold text-lg mt-2">
                  Your application is Pending
                </p>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default ViewApplicationStatus;