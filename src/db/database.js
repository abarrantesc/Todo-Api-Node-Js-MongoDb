import mongoose from "mongoose";



export const connectDb = async () => {
   await mongoose
      .connect(
        "your string connection"
      )
      .then((s) => {
        console.log(">>>>Db is Connected");
      })
      .catch((err) => {
        console.log(err);
      });
};
