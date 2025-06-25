import { Webhook } from "svix";
import User from '../models/User.js';

//  api conteroller to manafe the clerk user with the databasr 
export const clerkWebhooks = async( req, res) => {
    try {
        
        //  create a svix instance with cleerk webhook secrect
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        //  verify the  headers
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        })

        //  getting data from the request body
        const {data , type } = req.body;

        //  switch case for ddifferent veenvsts 
        switch(type) {
            case  'user.created':{
                const userData = {
                    _id : data.id,
                    email : data.email_addresses[0].email_address,
                    name : data.first_name + ' ' + data.last_name,
                    image : data.image_url,
                    resume : '',
                }
                await User.create(userData)
                res.json({})
                break;
            }
             case  'user.updates':{
                const userData = {
                  
                    email : data.email_addresses[0].email_address,
                    name : data.first_name + ' ' + data.last_name,
                    image : data.image_url,
                    
                }
                await User.findByIdAndUpdate(data.id , userData)
                res.json({});
                break;

            }
             case  'user.deleted':{
                await User.findByIdAndDelete(data.id);
                res.json({});
                break;
            }
            default :{
                break; 
            }

        }


    } catch (error) {

        console.log(error.message);
        res.json({
            success : false,
            message : 'Webhook error',
        })
    }
}