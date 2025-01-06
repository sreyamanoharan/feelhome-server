import Host from "../../Models/HostModel.js";

export const addedProperty=async (req,res)=>{
    try {
        const addedProp=await Host.find()
        res.status(200).json({addedProp})
    } catch (error) {
        console.log(error);
    }
}
