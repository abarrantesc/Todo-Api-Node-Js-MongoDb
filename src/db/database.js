import mongoose from "mongoose";



export const connectDb = async () => {
   await mongoose
      .connect(
        "mongodb+srv://zus:gWuyWhVyssTZaY49@cluster0.srne526.mongodb.net/?retryWrites=true&w=majority"
      )
      .then((s) => {
        console.log(">>>>Db is Connected");
      })
      .catch((err) => {
        console.log(err);
      });
};
