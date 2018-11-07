const taskModel = require('../models/task')
class Controller{
    static insertTask(req,res) {
        taskModel.create({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        })
        .then(data=>{
            res.status(200).json({
                message:'Successfully added',
                data : data
            })
        })
        .catch(err=>{
            res.status(500).json({
                message: err
            })
        })
    }
    static update(req,res){
        taskModel.findByIdAndUpdate(
            req.params.id,
            {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
            }           
        )
    }
    static showAll(req,res){
        taskModel.find()
        .then((data)=>{
            res.json(data)
        })
    }
}
module.exports = Controller