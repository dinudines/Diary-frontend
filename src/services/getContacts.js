import { API } from "aws-amplify";

const getContacts = () => {
    return API.get("contacts", "/contacts");
}

export default getContacts;