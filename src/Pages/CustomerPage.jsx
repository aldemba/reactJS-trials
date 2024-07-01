import React, { useEffect, useState } from "react";
import customersAPI from "../services/custumersAPI";

const CustomerPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setcurrentPage]=useState(1);

    const handlePageChange= (page)=>{
        setcurrentPage(page);
    }

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

    const itemsPerPage = 10;
    const pageCount = Math.ceil(customers.length/itemsPerPage);
    const pages=[]
    for (let i = 1; i <= pageCount; i++) {
         pages.push(i);
        
    }
    const start= currentPage * itemsPerPage -itemsPerPage
    const paginatedCustomers= customers.slice(start, start +itemsPerPage)


    console.log(pages);


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
                {paginatedCustomers.map((customer) => 
                
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
        <div>
  <ul className="pagination pagination-sm">
    <li className={"page-item " + (currentPage === 1 && " disabled" ) } onClick={()=>handlePageChange(currentPage -1)} >
      <button className="page-link" >&laquo;</button>
    </li>
   {pages.map(page => (
     <li className={"page-item" + (currentPage === page && " active" )} key={page}>
     <button className="page-link" onClick={()=>handlePageChange(page)} >{page}</button>
   </li>
   ))}
    <li className={"page-item " + (currentPage === pageCount && " disabled" )} onClick={()=>handlePageChange(currentPage +1)}>
      <button >&raquo;</button>
    </li>
  </ul>
</div>
        </>
    );
}
 
export default CustomerPage;