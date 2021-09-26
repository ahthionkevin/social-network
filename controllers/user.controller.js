const UserModel = require("../models/user.model")
const ObjectID = require('mongoose').Types.ObjectId

module.exports.getAllUSers = async (req,res) =>{
    const users = await UserModel.find().select('-password')
    return res.status(200).json(users)
}

module.exports.userInfo = async (req,res) =>{
    console.log(req.params)
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID UNKNOW: " + req.params.id)
    
    UserModel.findById(req.params.id, function(err,docs){
        if(!err)
            return res.status(200).send(docs)
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
                if(!err) return res.status(200).send(docs)
                else return res.status(500).send("CAN NOT MODIFIED")
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
            if(!err) return res.status(200).send("successfully delete")
            else return res.status(400).send("can not delete user")
        })
        
    } catch (error) {
        return res.status(400).send("can not delete user")
    }
}

module.exports.follow = async (req, res) => {
    if (
      !ObjectID.isValid(req.params.id) ||
      !ObjectID.isValid(req.body.idToFollow)
    )
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      // add to the follower list
      await UserModel.findByIdAndUpdate(
        req.params.id,
        { $push: { following: req.body.idToFollow } },
        { new: true, upsert: true },
        (err, docs) => {
            if (!err) {
                console.log("FOLLOWING OK")
                
                UserModel.findByIdAndUpdate(
                    req.body.idToFollow,
                    { $push: { followers: req.params.id } },
                    { new: true, upsert: true },
                    (err, docs) => {
                       if (err) return res.status(400).json(err);
                    }
                  );
            }
            else return res.status(400).json(err);         
           
        }
      );

    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };
  


module.exports.unfollow = async(req,res) =>{
    if (
        !ObjectID.isValid(req.params.id) ||
        !ObjectID.isValid(req.body.idToUnFollow)
      )
        return res.status(400).send("ID unknown : " + req.params.id);
    
      try {
        // add to the follower list
        await UserModel.findByIdAndUpdate(
          req.params.id,
          { $pull: { following: req.body.idToUnFollow } },
          { new: true, upsert: true },
          async (err, docs) => {
              if (!err) {
                  console.log("UNFOLLOWING OK")
                  
                  await UserModel.findByIdAndUpdate(
                      req.body.idToUnFollow,
                      { $pull: { followers: req.params.id } },
                      { new: true, upsert: true },
                      (err, docs) => {
                         if (err) return res.status(400).json(err);
                      }
                    );
              }
              else return res.status(400).json(err);         
             
          }
        );
  
      } catch (err) {
        return res.status(500).json({ message: err });
      }
}