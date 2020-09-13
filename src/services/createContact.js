import { API } from "aws-amplify";

const createContact = ({ firstName, lastName, email, phoneNo, status }) => {
    return API.post("contacts", "/contacts", {
        body: {
            content: {
                firstName, lastName, email, phoneNo, status
            }
        }
    });
}

export default createContact;