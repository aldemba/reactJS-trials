import axios from "axios";
import React, { useEffect, useState } from "react";

const CustomerPage = (props) => {

    const[customers, setCustomers] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8000/api/customers").then((response) => response.data).then((data) => setCustomers(data)).catch(error=>console.log(error.response));
    },[])

    const handleDelete = id =>{
        const originalCustomers=[...customers];

        setCustomers(customers.filter((customer)=>customer.id !== id));

        axios.delete("http://localhost:8000/api/customers/"+id).then((response)=>{console.log("ok")}).catch(error=>{
            setCustomers(originalCustomers);
            console.log(error.response);
        })
    }

    return (  
        <>
        <h1>Liste des clients</h1>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id.</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th className="text-center">Factures</th>
                    <th className="text-center">Montant Total</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer) => 
                
                <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>
                        <a href="/">{customer.firstname} {customer.lastname}</a>
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.company}</td>
                    <td className="text-center">
                        {customer.invoices.length}
                        </td>
                    <td className="text-center">{customer.totalAmount.toLocaleString()} FCFA </td> 
                    <td>
                        <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(customer.id)}>Supprimer</button>
                    </td>
                </tr>
                
                )}
            </tbody>
        </table>
        </>
    );
}
 
export default CustomerPage;