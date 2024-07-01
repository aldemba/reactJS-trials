import React, { useState } from 'react';
import axios from 'axios';


const LoginPage = (props) => {

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("")

    const handleChange =(event)=> {
        const value = event.target.value;
        const name = event.target.name;

        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit =async (event)=> {
        event.preventDefault();
        console.log(credentials);

        try {
            await axios.post("http://localhost:8000/api/login_check", credentials).then(response=> console.log(response));
        }catch(error){
            console.log(error.response);
            setError("Email ou mot de passe incorrect !")
        }
    }

    return (
        <>
        <h1>Connexion à l'application</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group"><label htmlFor="username">Email</label>
        <input type="email" className="form-control" id='username' name='username' onChange={handleChange} />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className={"form-control"+ (error && " is-invalid")} id='password' name='password' onChange={handleChange} />
            {error && (<p className='invalid-feedback'>{error}</p>)}
        </div>
        <div className="form-group"><button type="submit" className="btn btn-success">Connexion</button></div>
        </form>
        </>
      );
}
 
export default LoginPage;