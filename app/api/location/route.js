import Owner from "../../models/owner.model.js";
import dbConnect from "../../models/db.js";

// Handle the GET request
export const getOwnerLocation = async (req, res) => {
    await dbConnect(); // Connect to the database

    try {
        const owners = await Owner.find({}, 'latitude longitude'); // Fetch latitude and longitude
        res.status(200).json(owners);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching owner data' });
    }
};

// Export handlers for different HTTP methods
export default async function handler(req, res) {
    if (req.method === 'GET') {
        return getOwnerLocation(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
