import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  taskName: {
    type: String,
    required: [true, 'Task name is required'],
    cast:false
  },
  comments: [
    {
      content:{
        type:String
      }
    },
  ],
  status:{
    type:String,
    default:"to-do",
    cast:false,
    required: [true, 'Status is required']
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: [true, 'Creation Date is required']
  },
  updateDate: {
    type: Date,
    default: Date.now,
    required: [true, 'Update Date is required']

  } 
},
{
  versionKey: false, // Here You have to add.
});

export default model('Task',todoSchema)



