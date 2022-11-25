import todoModel from "../models/todoModel.js";

const todoController = {};

todoController.createTask = async (req, res) => {
  try {

    if(req.body.comments_id!==undefined){
      return res.status(400).send({ data: null,message: "_id is not required for comments" ,isSucess: false });
    }

    const todo = new todoModel({
      taskName: req.body.taskName,
      comments: req.body.comments,
    });

    const isExist = await todoModel.findOne({taskName:todo.taskName});

    if(isExist){
        return  res.status(202).send({ data: null,message: "Task name already exists" ,isSucess: true });

    }
      await todo.save();
      res
        .status(200)
        .send({ data: todo,isSucess: true  });
  } catch (error) {

    if(error.name=="ValidationError"){
        return  res.status(400).send({ error: "Validation failed", message: error.message,isSucess: false  });
    }

      return  res.status(500).send({ error: "Internal Server Error", message: error.message,isSucess: false });

    }
};

todoController.getAllTask = async (req, res) => {
    try {
       const data = await todoModel.find();
       if(data.length==0){
        res.status(202).send({ data: null,message: "No records found" ,isSucess: true });
       }else{
        res .status(200) .send({ data: data,isSucess: true  });
       }

    } catch (error) {
        res.status(500).send({ error: "Internal Server Error", message: error.message,isSucess: false });
    }
  };
  
  todoController.getTaskById = async (req, res) => {
    try {

       const data = await todoModel.findById(req.params.idTask)

       if(data == null){
        res.status(202).send({ data: null,message: "No records found",isSucess: true  });
       }else{
        res .status(200) .send({ data: data,isSucess: true  });
       }

    } catch (error) {
      res.status(500).send({ error: "Internal Server Error", message: error.message, isSucess: false });
    }
  };

  todoController.deleteTask = async (req, res) => {
    try {
       const data = await todoModel.findOneAndDelete(req.params.idTask)
       if(data==null){
        res.status(202).send({ data: null,message: "No records found", isSucess: true });
       }else{
        res .status(200) .send({ data: null, message: "Successfully deleted",isSucess: true});
       }

    } catch (error) {
      res.status(500).send({ error: "Internal Server Error", message: error.message,isSucess: false });
    }
  };

  todoController.updateTask = async (req, res) => {
    try {

        const filter = { _id: req.body.idTask };
        const update = {  
        taskName: req.body.taskName,
        status: req.body.status,
        updateDate: Date.now()
       };


       const data = await todoModel.findByIdAndUpdate(filter, update)
       

       if(data==null){
        res.status(202).send({ data: null,message: "No records found", isSucess: true });
       }else{
        res .status(200) .send({ data: null, message: "Successfully updated",isSucess: true});
       }

    } catch (error) {
      res.status(500).send({ error: "Internal Server Error", message: error.message,isSucess: false });
    }
  };

  todoController.addCommentTask = async (req, res) => {
    try {
       const data = await todoModel.findById(req.body.idTask)


       if(data==null){
        res.status(202).send({ data: null,message: "No records found", isSucess: true });
       }else{
        data.comments.push(req.body.comments)
        data.save(data)
        res .status(200) .send({ data: null, message: "Comment added successfully",isSucess: true});
       }

    } catch (error) {
      res.status(500).send({ error: "Internal Server Error", message: error.message,isSucess: false });
    }
  };

  todoController.updateCommentTask = async (req, res) => {
    try {


      if(req.body.idTask===undefined){
        return res.status(400).send({ data: null,message: "idTask is required", isSucess: false });
      }

      if(req.body.comments._id===undefined || req.body.comments.content===undefined ){
        return res.status(400).send({ data: null,message: "_id comment and content field is required", isSucess: false });
      }


        const isExist = await todoModel.findById(req.body.idTask)

        if(isExist==null){
            return res.status(202).send({ data: null,message: "No records found", isSucess: true });

        }

        const findComment = {'comments._id' : { "$in": [req.body.comments._id]}}

        const dataComment = await todoModel.find(findComment)   

        if(dataComment.length==0){
            return res.status(202).send({ data: null,message: "Cannot update, comment not found", isSucess: true });

        }

        const filter = { '_id': req.body.idTask, 'comments._id': req.body.comments._id};
        const update =  { "$set": {'comments.$.content' : req.body.comments.content}}

        
       const data = await todoModel.updateOne(filter, update)   

       if(data==null){
        res.status(202).send({ data: null,message: "No records found", isSucess: true });
       }else{
        res .status(200) .send({ data: null, message: "Successfully updated",isSucess: true});
       }

    } catch (error) {
      res.status(500).send({ error: "Internal Server Error", message: error.message,isSucess: false });
    }
  };

  todoController.deleteCommentTask = async (req, res) => {
    try {

        const isExist = await todoModel.findById(req.body.idTask)
        if(isExist==null){
            return res.status(202).send({ data: null,message: "No records found", isSucess: true });

        }


        const findComment = {'comments._id' : { "$in": [req.body.comments._id]}}

        const dataComment = await todoModel.find(findComment)   

        if(dataComment.length==0){
            return res.status(202).send({ data: null,message: "Cannot update, comment not found", isSucess: true });

        }



        const filter = { _id: req.body.id};
        const update =  { "$pull": {'comments' :{'_id':req.body.comments._id}}}

       const data = await todoModel.findOneAndUpdate(filter, update)   

       if(data==null){
        res.status(202).send({ data: null,message: "No records found", isSucess: true });
       }else{
        res .status(200) .send({ data: null, message: "Successfully updated",isSucess: true});
       }

    } catch (error) {
      res.status(500).send({ error: "Internal Server Error", message: error.message,isSucess: false });
    }
  };

export default todoController;
