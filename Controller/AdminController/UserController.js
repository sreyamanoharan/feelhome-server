import userSchema from '../../Models/UserModel.js'


export const getUser=async(req,res)=>{
    try {
        const user=await userSchema.find()
        res.status(200).json({user})
    } catch (error) {
        console.log(error);
    }
}


export const userStatus = async (req,res)=>{
    try{
        const {userId,blocked} = req.body
     
        if(blocked){
            await userSchema.updateOne({_id:userId},{$set:{isBlocked:false}})
            return res.status(200).json({message:'Selected user Un-Blocked',isblocked:false})
        }else{
            await userSchema.updateOne({_id:userId},{$set:{isBlocked:true}})
            return res.status(200).json({message:'Selected user blocked',isblocked:true})
        }
    }catch (err){
        return res.status(500).json({errmsg:'Server error'})
    }
}


export const latestUsers= async (req,res)=>{
    try {
        const latestUsers= await userSchema.aggregate([
            {
              $sort: { _id: -1 }
            },
            {
              $limit: 5
            },
            {
              $project: {
                _id: 0,
                name: 1,
                email: 1,
                status: "$isBlocked",
                registrationDate: 1
              }
            }
          ]);
        res.status(200).json({latestUsers})
    } catch (error) {
        console.log(error);
    }
}


export const getUserNum=async(req,res)=>{
    try {
      const num=await userCollection.countDocuments()
      res.status(200).json({num})
    } catch (error) {
      console.log(error);
    }
  }
  
  export const latestUsersnum = async (req, res) => {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; 
  
      const startDate = new Date(currentYear, currentMonth - 1, 1);
  
      const endDate = new Date(currentYear, currentMonth, 0);
  
      const num = await userCollection.countDocuments({
        registrationDate: {
          $gte: startDate,
          $lte: endDate,
        },
      });
          
      res.status(200).json({num})
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  