import { useEffect, useState } from "react";
import axios from "axios";

export default function HallticketPage() {

  const [hallticketUrl, setHallticketUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const API = "https://project-backend-kvv2.onrender.com";

  /* --------------------------------
     FETCH HALLTICKET
  -------------------------------- */

  const fetchHallticket = async () => {
    try {

      const res = await axios.get(`${API}/hallticket/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHallticketUrl(res.data.hallticketUrl);

    } catch (err) {
      console.log("Hallticket not generated yet");
    }
  };

  /* --------------------------------
     GENERATE HALLTICKET
  -------------------------------- */

  const generateHallticket = async () => {

    try {

      setLoading(true);
      setMessage("");

      const res = await axios.post(
        `${API}/hallticket/download`,
        {
          examName: "End Semester Examination",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHallticketUrl(res.data.hallticketUrl);

      setMessage("Hallticket generated successfully!");

    } catch (err) {

      setMessage(
        err.response?.data?.message || "Failed to generate hallticket"
      );

    } finally {
      setLoading(false);
    }
  };

  /* --------------------------------
     DOWNLOAD HALLTICKET
  -------------------------------- */

  const downloadHallticket = async () => {

    const res = await axios.get(
      `${API}/hallticket/download`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));

    const link = document.createElement("a");

    link.href = url;
    link.download = "hallticket.pdf";

    link.click();
  };

  useEffect(() => {
    fetchHallticket();
  }, []);

  return (

    <div className="p-8 bg-green-50 min-h-screen">

      {/* PAGE TITLE */}

      <h1 className="text-3xl font-bold text-green-700 mb-8">
        Hallticket Download
      </h1>

      {/* MAIN CARD */}

      <div className="bg-white shadow-xl rounded-xl p-8 max-w-xl">

        {/* DESCRIPTION */}

        <p className="text-gray-600 mb-4">
          Students can download their hallticket for the upcoming examinations.
        </p>

        <ul className="list-disc ml-6 text-gray-600 mb-6">
          <li>Exam fees must be paid</li>
          <li>Attendance must be above 75%</li>
        </ul>

        {/* STATUS */}

        <div className="mb-6">

          {hallticketUrl ? (

            <p className="text-green-600 font-semibold">
              ✅ Hallticket Generated
            </p>

          ) : (

            <p className="text-red-500 font-semibold">
              ❌ Hallticket Not Generated
            </p>

          )}

        </div>

        {/* BUTTONS */}

        <div className="flex flex-wrap gap-4">

          {!hallticketUrl && (

            <button
              onClick={generateHallticket}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow"
            >
              {loading ? "Generating..." : "Generate Hallticket"}
            </button>

          )}

          {hallticketUrl && (

            <button
              onClick={downloadHallticket}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow"
            >
              Download Hallticket
            </button>

          )}

        </div>

        {/* MESSAGE */}

        {message && (

          <p className="mt-6 text-sm text-red-500">
            {message}
          </p>

        )}

      </div>

    </div>
  );
}