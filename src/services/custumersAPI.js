import axios from "axios";

function findAll(){
    return axios.get("http://localhost:8000/api/customers").then(response=>response.data);
}

const customersAPI = {
    findAll
};
export default customersAPI;