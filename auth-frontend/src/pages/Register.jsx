import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Register(){
    const navigate = useNavigate();
    const [form,setForm]=useState({
        name:"",
        email:"",
        password:""
    });

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
           
        const response = await fetch("http://localhost:5000/api/auth/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(form),
        });
        if(!response.ok){
            const error = await response.json().catch(() => ({}));
            return alert(error.message || "Registration failed");
        }

        alert("Registered successfully!");
        navigate("/login");
        setForm({
            name: "",
            email: "",
            password: ""
        });
    } catch(err) {
        alert(err.message || "Network error, please try again.");
    }
    };

   return(
   <form
   onSubmit={handleSubmit}
   className="p-6 shadow-lg  max-w-4xl mt-4  rounded-lg border border-green-600 mx-auto flex flex-col  hover:shadow-xl shadow-blue-600 transition "
   >
    <h1 
    className="text-2xl font-bold text-blue-600 mb-6 mx-auto"
    >Welcome to notes App 
   
    </h1>
    <input 
    value={form.name}
    placeholder="Name"
    className="border px-4 py-2 rounded-xl mb-6 w-5/7 border-2 border-green-800  hover:border-green-600"
    onChange={(e)=>setForm({...form,name:e.target.value})}
    />

    <input 
    value={form.email}
    placeholder="Email"
    className="border px-4 py-2 rounded-xl mb-6 w-5/7 border-2 border-green-800  hover:border-green-600"
    onChange={(e)=>setForm({...form,email:e.target.value})}
    />

    <input 
    value={form.password}
    type="password"
    placeholder="Password"
    onChange={(e)=>setForm({...form,password:e.target.value})}
    className="border px-4 py-2 rounded-xl mb-6 w-5/7 border-2 border-green-800  hover:border-green-600"
    />

    <button 
    type="submit"
    className="bg-green-600 px-4 py-2 rounded-lg mx-auto text-white font-bold text-lg hover:bg-green-700 "
    >Register</button>

    <Link
    to={"/login"}
    className="hover:text-green-600"
    >
    <p >Already have an account? <span className="text-blue-600">Login</span></p>
    </Link>

   </form>

   )
   
}