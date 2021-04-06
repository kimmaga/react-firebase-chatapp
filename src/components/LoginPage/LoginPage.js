import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

function LoginPage() {

    const {register , errors, handleSubmit} = useForm();
    const [errorsFromSubmit, setErrorsFromSubmit] = useState("")
    const [loading,setLoading] = useState(false);

    const onSubmit = async (data) =>{
        try{
            setLoading(true);
            await firebase.auth().signInWithEmailAndPassword(data.email,data.password);
            setLoading(false);
        }catch(error){
            setErrorsFromSubmit(error.message);
            setLoading(false);
            setTimeout(()=>{
                setErrorsFromSubmit("");
            },5000)
        }
      
    }
    return (
        <div className="auth-wrapper" style={{backgroundColor:'black'}}>
            <div style={{textAlign:'center'}}><h3>Login</h3></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input
                    name="email"
                    type='email'
                    ref={register({ required: true,pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <p>This email field is required</p>} 
              
                <label>Password</label>
                <input
                    name="password"
                    type='password'
                    ref={register({ required: true, maxLength: 6 })}
                />
                {errors.password && errors.password.type === 'required'
                    && <p>This password field is required</p>} 
                {errors.password && errors.password.type === 'maxLength'
                    && <p>Password must have at least 6 characters</p>} 

               
                {errorsFromSubmit &&
                    <p>{errorsFromSubmit}</p>
                }
                <input type="submit" disabled = {loading}/>
                <Link style={{color:'grey',textDecoration:'none'}} to='register'>아직 아이디가 없다면...</Link>
            </form>

        
        </div>
    )
}

export default LoginPage