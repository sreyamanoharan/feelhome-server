import HostSchema from '../../Models/HostModel.js';
import { ObjectId } from 'mongodb';



export const postData = async (req, res) => {
  
  try {
    const {
      selectedCategory,
      selectedType,
      selectedFeature,
      address,
      selectedLocation,
      selectedPrice,
      images,
      selectedBasics,
      description
    } = req.body.hostData;

    const hostId = req.body.userEmail;
    
const selectedFeatures=selectedFeature.map((feat)=>{
return feat.heading

  
});
console.log(req.body.hostData.description);


    const hostData = new HostSchema({
      selectedCategory,
      selectedType,
      selectedFeatures,
      address,
      selectedLocation,
      selectedPrice,
      images,
      selectedBasics,
      description,
      hostId: hostId
    });

    let hostDatas = await hostData.save();
    if (hostDatas) res.status(200).json({ hostData: hostDatas });
    else res.status(500).json({ error: 'Internal server error' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const getData = async (req, res) => {
  try {

    const id = req.params.userId
    const hostData = await HostSchema.find({ hostId:id })
    res.status(200).json({ hostData })
  } catch (error) {

  }
}


export const getDetails = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the host details
    const hostDetails = await HostSchema.findById(id);
    console.log(hostDetails,'detailsssss');
    

    if (!hostDetails) {
      return res.status(404).json({ message: 'Host not found' });
    }

    // // Fetch feature details manually using the selectedFeature array
    // const featureDetails = await FeatureSchema.find({
    //   _id: { $in: hostDetails.selectedFeatures },
    // });

    // // Combine host details with feature details
    // const fullDetails = {
    //   ...hostDetails.toObject(),
    //   selectedFeatures: featureDetails,
    // };

    res.status(200).json({ details: hostDetails });
  } catch (error) {
    console.error('Error fetching details:', error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
