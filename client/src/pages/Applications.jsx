import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } =
    useContext(AppContext);

  const datta = useContext(AppContext);
  console.log(datta);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/users/update-resume",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your resume</h2>
        <div className="flex gap-4 mb-6 mt-4">
          {isEdit || !userData || userData.resume === "" 
           ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="upload icon" />
              </label>
              <button
                onClick={updateResume}
                className="bg-green-200 border border-green-500 py-2 px-4 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                href={userData.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-400 px-4 py-2 rounded"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4"> Jobs Applied</h2>

        <table className="min-w-full bg-white border-2 border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-3 border-b border-gray-200 text-left">
                Company
              </th>
              <th className="px-4 py-3 border-b border-gray-200 text-left">
                Job Title
              </th>
              <th className="px-4 py-3 border-b border-gray-200 text-left max-sm:hidden">
                Location
              </th>
              <th className="px-4 py-3 border-b border-gray-200 text-left max-sm:hidden">
                Date
              </th>
              <th className="px-4 py-3 border-b border-gray-200 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(userApplications) && userApplications.length > 0
              ? userApplications.map((job, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                      <img
                        className="w-8 h-8"
                        src={job.companyId.image}
                        alt={job.companyId.name}
                      />
                      {job.companyId.name}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200">
                      {job.jobId.title}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 max-sm:hidden">
                      {job.jobId.location}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200 max-sm:hidden">
                      {moment(job.date).format("ll")}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200">
                      <span
                        className={`text-sm font-semibold px-4 py-1.5 rounded-lg ${
                          job.status === "Accepted"
                            ? "bg-green-100"
                            : job.status === "Rejected"
                            ? "bg-red-100"
                            : "bg-blue-100"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))
              : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-3 border-b border-gray-200 text-center"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};

export default Applications;
