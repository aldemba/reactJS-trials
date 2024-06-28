import React, { useEffect, useState } from "react";
import customersAPI from "../services/custumersAPI";

const CustomerPage = (props) => {

    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const data = await customersAPI.findAll()
            setCustomers(data);
        }catch(error){
            console.log(error.response);
        }
    }

    //au chargement du composant, on va chercher les customers
    useEffect(() => {
        fetchCustomers();
    //    customersAPI.findAll().then((data) => setCustomers(data)).catch(error=>console.log(error.response));
    },[])



    //methode 1 pour supprimer
    const handleDelete = async id =>{
        const originalCustomers=[...customers];

        setCustomers(customers.filter((customer)=>customer.id !== id));

        try{
          await customersAPI.delete(id)  
        }catch(error){
            setCustomers(originalCustomers);
        }

    }


    //methode 2 pour supprimer

    // const handleDelete = id =>{
    //     const originalCustomers=[...customers];

    //     setCustomers(customers.filter((customer)=>customer.id !== id));

    //     customersAPI.delete(id).then((response)=>{console.log("ok")}).catch(error=>{
    //         setCustomers(originalCustomers);
    //         console.log(error.response);
    //     })
    // }

//     <div>
//   <ul class="pagination pagination-sm">
//     <li class="page-item disabled">
//       <a class="page-link" href="#">&laquo;</a>
//     </li>
//     <li class="page-item active">
//       <a class="page-link" href="#">1</a>
//     </li>
//     <li class="page-item">
//       <a class="page-link" href="#">2</a>
//     </li>
//     <li class="page-item">
//       <a class="page-link" href="#">3</a>
//     </li>
//     <li class="page-item">
//       <a class="page-link" href="#">4</a>
//     </li>
//     <li class="page-item">
//       <a class="page-link" href="#">5</a>
//     </li>
//     <li class="page-item">
//       <a class="page-link" href="#">&raquo;</a>
//     </li>
//   </ul>
// </div>


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
                        <button className="btn btn-sm btn-danger" disabled={customer.invoices.length>0}  onClick={()=>handleDelete(customer.id)}>Supprimer</button>
                    </td>
                </tr>
                
                )}
            </tbody>
        </table>
        </>
    );
}
 
export default CustomerPage;