import mongoose from 'mongoose';

//  funtion to connect to the database

const connectDb  = async () =>{
    mongoose.connection.on("connected" , () =>{
        console.log("databse coonnected successfully");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}`);
}

export default connectDb;