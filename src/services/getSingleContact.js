import { API } from "aws-amplify";

const loadContact = (id) => {
    return API.get("contacts", `/contacts/${id}`);
};

export default loadContact;