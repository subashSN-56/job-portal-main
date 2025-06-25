import React from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Loading from "../components/Loading";

const ManageJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState(false);
  const { backendUrl, companyToken } = useContext(AppContext);
  //  funtion to fetch company jobs applications data

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // function to change job visibility
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        {
          id,
        },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message || "Job visibility changed successfully");
        fetchCompanyJobs();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  return jobs ? (
    jobs.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold shadow text-gray-600 p-3 bg-white ">
          No jobs Available or posted Yet
        </p>
      </div>
    ) : (
      <div className="containerp-4 max-w-5xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left max-sm:hidden">
                  #
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">
                  Job Tilte
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left  max-sm:hidden">
                  Date
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left  max-sm:hidden">
                  Location
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-center">
                  Applicants
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left">
                  visible
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr className="text-gray-700" key={index}>
                  <td className="py-2 px-4 border-b border-gray-200 max-sm:hidden">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {job.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-center">
                    {job.applicants}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <input
                      onChange={() => changeJobVisibility(job._id)}
                      className="scale-125 ml-4"
                      type="checkbox"
                      checked={job.visible}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => navigate("/dashboard/add-job")}
            className="bg-black text-white rounded px-4 py-2"
          >
            Add New Job
          </button>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ManageJobs;
