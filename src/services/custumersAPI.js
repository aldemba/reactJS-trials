import axios from "axios";

function findAll(){
    return axios.get("http://localhost:8000/api/customers").then(response=>response.data);
}

function deleteCustomer(id){
    return axios.delete("http://localhost:8000/api/customers/"+id);
}

const customersAPI = {
    findAll,
    delete: deleteCustomer,
};
export default customersAPI;