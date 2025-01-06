import hostSchema from '../../Models/HostModel.js'


export const getData=async(req,res)=>{
    try {
      console.log('hiiii loh');
      
        const hostData=await hostSchema.find()
        res.status(200).json({hostData})
    } catch (error) {
        console.log(error);
    }
}


export const getDetails=async(req,res)=>{
    try {
      const id=req.params.id
      console.log(id);
      const details= await hostSchema.findById(id).populate('hostId')
    
      res.status(200).json({details})
    } catch (error) {
      console.log(error);
    }
  }


export const latestProperties=async (req, res) => {
  try {
   
    const latestProperties = await hostSchema.find().sort({ createdAt: -1 }).limit(2); 
    res.status(200).json({ latestProperties });
  } catch (error) {
    console.error('Error fetching latest properties:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}





