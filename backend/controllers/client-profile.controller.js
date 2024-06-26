import ClientProfile from '../models/client-profile.model.js';
import User from '../models/user.model.js'; // Import the User model to find the current user

class ClientController {
    static async updateClientProfile(req, res) {
        try {
            const { username, fullName, address1, address2, city, state, zipcode } = req.body; // destructure profile data from frontend
            
            if (!username || !fullName || !address1 || !city || !state || !zipcode) {
                return res.status(400).json({ error: "One or more required fields is missing" });
            }

            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const clientProfile = await ClientProfile.findOne({ _id: user.clientProfile });

            if (!clientProfile) {
                return res.status(404).json({ error: "ClientProfile not found" });
            }

            clientProfile.fullName = fullName;
            clientProfile.address1 = address1;
            clientProfile.address2 = address2;
            clientProfile.city = city;
            clientProfile.state = state;
            clientProfile.zipcode = zipcode;

            // save the updated ClientProfile
            await clientProfile.save();

            res.status(200).json({ profile: clientProfile });
    
        } catch (error) {
            console.log("Error in client profile controller", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    // function to get client's profile data
    static async getClientProfile(req, res) {
        try {
          const { username } = req.params;
    
            
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
          const clientProfile = await ClientProfile.findOne({ _id: user.clientProfile });
    
          if (!clientProfile) {
            return res.status(404).json({ error: "Client profile not found" });
          }
    
          res.status(200).json({ clientProfile });
        } catch (error) {
          console.error("Error fetching client profile:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }



}

export default ClientController;
