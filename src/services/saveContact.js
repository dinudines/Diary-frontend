import { API } from "aws-amplify";

const saveContact = (id, {firstName, lastName, email, phoneNo, status}) => {
    return API.put("contacts", `/contacts/${id}`, {
        body: {
            content: {
                firstName, lastName, email, phoneNo, status
            }
        }
    });
}

export default saveContact;