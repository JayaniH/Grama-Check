// api.js
import axios from 'axios';

const registerUserInAsgardeo = async (userData) => {
  const options = {
    method: 'POST',
    url: 'https://api.asgardeo.io/t/organization123/scim2/Users',
    headers: {
      'Content-Type': 'application/scim+json',
      Accept: 'application/scim+json',
      Authorization: 'Bearer ' + { token }
    },
    data: JSON.stringify(userData),
  };


};

export default registerUserInAsgardeo;





try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}
