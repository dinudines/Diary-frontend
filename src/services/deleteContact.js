import { API } from "aws-amplify";

const deleteContact = (id) => {
    return API.del("contacts", `/contacts/${id}`);
}

export default deleteContact;