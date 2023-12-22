import axios from "../../api/axios";
import { GET_ORG_DETAILS_URL } from "../../utils/endpoints";

// Get organization details
const getAllOrganizations = async () => {
    try {
        const response = await axios.get(GET_ORG_DETAILS_URL);
        return response.data.orgs;
    } catch (error) {
        console.log("from orgService: ", error.message);
        throw error;
    }
}

const orgService = {
    getAllOrganizations,
}

export default orgService;