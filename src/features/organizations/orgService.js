import axios from "../../api/axios";
import { GET_ORG_DETAILS_URL } from "../../utils/endpoints";
import { GET_ORG_EVENTS_URL } from "../../utils/endpoints";

// Get organization details
const getAllOrganizations = async () => {
    try {
        const response = await axios.get(GET_ORG_DETAILS_URL);
        return response.data.orgs;
    } catch (error) {
        console.log("from orgService: (getAllOrganizations) ", error.message);
        throw error;
    }
}
// Get organization events
const getOrgEvents = async (orgID) => {
    try {
        const getOrgEventsURL = GET_ORG_EVENTS_URL.replace(':orgID', orgID);
        const response = await axios.get(getOrgEventsURL);
        return response.data.events;
    } catch (error) {
        console.log("from orgService: (getOrgEvents) ", error.message);
        throw error;
    }
}

const orgService = {
    getAllOrganizations,
    getOrgEvents,
}

export default orgService;