import React, { useContext, useEffect, useState } from 'react'
import { assets,  } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ViewApplications = () => {

  const {backendUrl , companyToken} = useContext(AppContext)

  const [applicants , setApplicants] = useState(false);

  //  function to ftech omapnay job appluaction ddata

  const fetchCompanyJobApplications = async () => {
    try {

      const {data} = await axios.get(backendUrl+ '/api/company/applicants' , {headers : {token: companyToken}})

      if ( data.success){
        setApplicants(data.applications.reverse())
      }else{
        toast.error(data.message || 'Something went wrong');
      }
      
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
      
    }
  }

  //  function to update job appl statis
  const changeJobApplicationStatus = async (id , status) => {
      try {
        const {data} = await axios.post(backendUrl + '/api/company/change-status' , {
          id , status
        } , {
          headers : {token : companyToken}
        })

        if( data.success){
          fetchCompanyJobApplications()
        }
        else{
          toast.error(data.message || 'Something went wrong');
        }
        
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
        
      }
  }

  useEffect(() => {
    if( companyToken){
      fetchCompanyJobApplications()
    }
  } , [companyToken ])

  return  applicants ? applicants.length === 0 ? (   <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold shadow text-gray-600 p-3 bg-white ">
          No Applications Available
        </p>
      </div>) :  (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr className='border-b-2 border-gray-200'>
              <th className='py-2 px-4 text-left'>#</th>
              <th  className='py-2 px-4 text-left'>User name</th>
              <th  className='py-2 px-4 text-left max-sm:hidden'>Job Title</th>
              <th  className='py-2 px-4 text-left max-sm:hidden'>Location</th>
              <th  className='py-2 px-4 text-left'>Resume</th>
              <th  className='py-2 px-4 text-left'>Action</th>

            </tr>
          </thead>
          <tbody>
            {applicants.filter(item => item.jobId && item.userId).map((applicant , index) =>(
              <tr key={index} className='text-gray-800'>
                <td className='py-2 px-4 border-b text-center'>{index+1}</td>
                <td className='py-2 px-4 border-b text-center flex items-center' >
                  <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' src={applicant.userId.image} />
                  <span>{applicant.userId.name}</span>

                </td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{applicant.jobId.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{applicant.jobId.location}</td>
                <td className='py-2 px-4 border-b'>
                  <a
                  className='bg-blue-50 text-blue-500 px-4 py-2 rounded inline-flex items-center gap-2'
                   href={applicant.userId.resume} target='_blank'>
                    Resume <img src={assets.resume_download_icon} />
                  </a>
                </td>
                <td className='py-2 px-4 border-b relative'>
                {applicant.status === "Pending" ? <div className='realtive inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                      <button onClick={() => changeJobApplicationStatus(applicant._id , 'Accepted')} className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Accept</button>
                      <button onClick={() => changeJobApplicationStatus(applicant._id , 'Rejected')} className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                    </div>

                  </div> : <div>{applicant.status}</div>
                    } 
                  
                </td>
              </tr>
            ) )}
          </tbody>
        </table>
      </div>
    </div> 
  ) : <Loading />
}

export default ViewApplications