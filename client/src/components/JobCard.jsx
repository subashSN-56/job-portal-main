import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-6 shadow rounded">
      <div className="flex justify-between items-center gap-4 mb-4">
        {job.companyId?.image && (
          <img className="h-8" src={job.companyId.image} alt="Company Logo" />
        )}
      </div>
      <h4 className="font-medium text-lg mb-2">{job.title}</h4>
      <div className="flex items-center gap-4 mt-2 text-xs">
        <span className="bg-blue-50 border border-blue-400 rounded px-4 py-2">
          {job.location}
        </span>
        <span className="bg-red-50 border border-red-400 rounded px-4 py-2">
          {job.level}
        </span>
      </div>
      <p
        className="text-gray-500 text-sm mt-4"
        dangerouslySetInnerHTML={{
          __html: job.description?.slice(0, 150) + "...",
        }}
      ></p>
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            window.scrollTo(0, 0);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            window.scrollTo(0, 0);
          }}
          className="text-gray-500 border border-gray-400 px-4 py-2 rounded"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
