import Job from "../models/Job.js"


//  get al jobs data 

export const getJobs = async ( req , res) => {

    try {

        const jobs = await Job.find({visible: true}).populate({
            path: 'companyId',select:'-password'
        })
        console.log("all jobs")

        res.json({
            success: true,
            jobs,
            message: "Jobs fetched successfully"
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
        
    }

}

//  get a single job by id
export const getJobById = async ( req , res) => {

    try {
        const {id} = req.params
        const job = await Job.findById(id).populate({
            path: 'companyId', select: '-password'
        })

        if( !job){
            return res.json({
                success: false,
                message: "Job not found"
            })
        }
        return res.json({
            success: true,
            job,
            // message: "Job fetched successfully"
        })
        
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
        
    }


}