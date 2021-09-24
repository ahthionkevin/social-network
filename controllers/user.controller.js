const UserModel = require("../models/user.model")
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAllUSers = async (req,res) =>{
    const users = await UserModel.find().select('-password')
    res.status(200).json(users)
}

module.exports.userInfo = async (req,res) =>{
    console.log(req.params)
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID UNKNOW: " + req.params.id)
    
    UserModel.findById(req.params.id, function(err,docs){
        if(!err)
            res.status(200).send(docs)
        else console.log("ID UNKNOW: " + req.params.id)
    }).select('-password')
}

module.exports.updateUser = async (req,res) =>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID UNKNOW: " + req.params.id)

    try{
        await UserModel.findOneAndUpdate(
            {_id:req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            {
                new: true,upsert: true,setDefaultsOnInsert:true
            },
            (err,docs) =>{
                if(!err) res.status(200).send(docs)
                else res.status(500).send("CAN NOT MODIFIED")
            }
        )
    }catch(err){
        console.log("Error: " + err)
    }
}

module.exports.deleteUser = async (req,res) =>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID UNKNOW: " + req.params.id)

    try {
        UserModel.findByIdAndRemove(req.params.id, (err,docs) =>{
            if(!err) res.status(200).send("successfully delete")
            else res.status(400).send("can not delete user")
        })
        
    } catch (error) {
        return res.status(400).send("can not delete user")
    }
}