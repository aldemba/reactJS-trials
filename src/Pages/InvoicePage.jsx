import React, { useEffect, useState } from "react";
import invoicesAPI from "../services/invoicesAPI";

const STATUS_CLASSES={
    PAID:"success",
    SENT:"primary",
    CANCELLED:"danger"
}

const STATUS_NAME={
    PAID:"Payée",
    SENT:"Envoyée",
    CANCELLED:"annulée"
}


const  InvoicePage = (props) => {

    const [invoices, setInvoices] = useState([]);

    const fetchInvoices= async ()=> {
        try {
            const data=await invoicesAPI.findAll()
            setInvoices(data);
        }catch(error){
            console.error(error.response);
        }
    }

    useEffect(()=>{
        fetchInvoices();
    },[])


    const handleDelete =id=>{
        const originalInvoices=[...invoices]

        setInvoices(invoices.filter(invoice=>invoice.id !==id));

        try {
            invoicesAPI.delete(id)
        } catch (error) {
            setInvoices(originalInvoices);
        }
    }

    // const formatDate =(temps)=>{
    //     moment(temps).format("DD/MM/YYYY")
    // }




    return ( 
        <>
        <h1>Liste des factures</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th>Date d'envoi</th>
                        <th>Statut</th>
                        <th>Montant</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td>{invoice.customer.firstname} {invoice.customer.lastname}</td>
                        <td>{invoice.sentAt}</td>
                        <td>
                            <span className={"btn btn-"+ STATUS_CLASSES[invoice.status]}>{STATUS_NAME[invoice.status]}</span>
                        </td>
                        <td>{invoice.amount.toLocaleString()} </td>
                        <td>
                            <button className="btn btn-sm btn-primary me-2">Editer</button>
                            <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(invoice.id)}>Supprimer</button>
                        </td>
                    </tr>

                    ))}
                </tbody>
            </table>

        </>
     );
}
 
export default InvoicePage ;