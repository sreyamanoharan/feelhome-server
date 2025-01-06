import { generateToken } from '../../middlewares/auth.js';
import adminCollection from '../../Models/AdminModel.js'
import categorySchema from '../../Models/CategoryModel.js'
import rent from '../../Models/RentModel.js';

export const adminlogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    const admin = await adminCollection.findOne({
      $and: [{ email: email }, { password: password }],
    });

    const token = generateToken(admin, 'admin')
    res.status(200).json({
      message: "admin successfully login",
      email: admin.email,
      adminId: admin._id,
      token,
      role: 'admin'
    });

  }
  catch (error) {
    res.status(500).json({ errmsg: "server error" });
    console.log(error)
  }
};

export const adminRevenue = async (req, res) => {
  try {
    
    const revenue = await adminCollection.find({}, { wallet: 1, _id: 0 });
    let walletAmount=revenue[0].wallet
    res.status(200).json({ revenue:walletAmount })
  } catch (error) {
    console.log(error);
  }
}



export const graphData= async(req,res)=>{
  try {
    const startDate = new Date('2023-01-01');
const endDate = new Date('2023-12-31');
    const graphDatas=await adminCollection.aggregate([{$unwind:"$walletHistory"},{$match:{"walletHistory.transactionType":"Credit","walletHistory.date":{$gte:startDate,$lt:endDate}}},{$group:{_id:{month:{$month:"$walletHistory.date"},year:{$year:"$walletHistory.date"}},totalAmount:{$sum:"$walletHistory.amount"},count:{$sum:1}},},{$sort:{"_id.month":1}}])
  
    res.status(200).json({
      graphDatas
    });
  } catch (error) {
   console.log(error);
  }
}

export const allCategories=async(req,res)=>{
  try {
   const allCategories=await categorySchema.find().sort({heading:1});
   const headings = allCategories.map(category => category.heading)
   res.status(200).json({headings})
  } catch (error) {
    console.log(error);
  }
}


export const getGraphCategory = async (req, res) => {
  try {
      

      const currentYear = new Date().getFullYear();


const graphCategory = await rent.aggregate([
  {
    $match: {
      bookedAt: {
        $gte: new Date(`${currentYear}-01-01`),
        $lt: new Date(`${currentYear + 1}-01-01`),
      },
    },
  },
  {
    $lookup: {
      from: 'hosts',
      localField: 'propertyId',
      foreignField: '_id',
      as: 'property',
    },
  },
  {
    $unwind: '$property',
  },
  {
    $group: {
      _id: '$property.selectedCategory',
      totalAmount: { $sum: '$Amount' },
      totalBookings: { $sum: 1 },
    },
  },
  {
    $project: {
      categoryName: '$_id',
      totalAmount: 1,
      totalBookings: 1,
      _id: 0,
    },
  },
]).exec();
      
      res.status(200).json({ graphCategory });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};