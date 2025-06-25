import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import Job from "../models/Job.js";

import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import JobApplication from "../models/JobApplication.js";
//  register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({
        success: false,
        message: "company already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//  company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email , password);

  try {
    const company = await Company.findOne({ email });
    // console.log(company.password ,"passwrod",  password)

    //  youtube code
    // if( bcrypt.compare(password , company.password)){
    //     return res.json({
    //         success: true,
    //         company : {
    //             _id : company._id,
    //             name : company.name,
    //             email : company.email,
    //             image : company.image
    //         }, token : generateToken(company._id)
    //     })

    // }
    // else{
    //     res.json({
    //         success: false,
    //         message: 'Invalid email or password'
    //     })
    // }
    if (!company) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, company.password); // 👈 AWAIT IS REQUIRED

    if (isMatch) {
      return res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// get company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;

    res.json({
      success: true,
      company,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//  post a new job
export const postJob = async (req, res) => {
  const { title, description, salary, location, level, category } = req.body;

  const companyId = req.company._id;

  // console.log(companyId, {title , description , salary , location} ) ;

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });

    await newJob.save();

    res.json({
      success: true,
      newJob,
      message: "Job posted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//  get comapny jib applicants
export const getCompanyJobApplicants = async (req, res) => {

  try {

    const companyId = req.company._id;

    //  find job applications for the user and poupltae reslted data

    const applications  = await JobApplication.find({
      companyId 
    }).populate('userId' , 'name image resume').populate('jobId' , 'title location category level salary').exec()

    return res.json({
      success: true,
      applications
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
    
  }


};

//  get compnay posted jobs
export const getCompanyPostedJobs = async (req, res) => {

    try {
        const companyId = req.company._id;

        const jobs = await Job.find({companyId})

        //    adding no of applicants info in data 
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({jobId: job._id  })
            return {...job.toObject() , applicants: applicants.length}
        }))

        res.json({
            success: true,
            jobsData
        })

        
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
        
    }

};

//  chnage job application status
export const changeJobApplicationStatus = async (req, res) => {
  
  try {
    const {id , status} = req.body
  //  find job application and update status

  await JobApplication.findOneAndUpdate({
    _id: id 
  }, {status  })

  res.json({
    success: true,
    message: "status changed"
  })

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
    
  }

};

// change job visibility
export const changeVisibility = async (req, res) => {
    try {
        const {id} = req.body;

        const companyId = req.company._id;

        const job = await Job.findById(id)

        if( companyId.toString() === job.companyId.toString()){
         job.visible = !job.visible;
         
        }
        await job.save();

        res.json({
            success: true,
            job ,
            // message: "Job visibility changed successfully"
        })


        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
        
    }
};
