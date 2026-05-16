import { useState } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Login({setIsAuth}) {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("${import.meta.env.VITE_API_URL}/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (!data.token) {
        console.error("Token missing in response:", data);
        throw new Error("Login successful, but no token was received. Check backend response.");
      }

      localStorage.setItem("token", data.token);
      
    
      if (typeof setIsAuth === "function") setIsAuth(true);

    
      navigate("/");
    } catch (err) {
      setError(err.message);
    }

 

    
  };
    

  return (
    <form onSubmit={handleSubmit}
      className="p-6 shadow-lg  max-w-2xl mt-4  rounded-lg border border-green-600 mx-auto flex flex-col  hover:shadow-xl shadow-blue-600 transition "
   
    >
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        className="border px-4 py-2 rounded-xl mb-6 w-5/7 border-2 border-green-800  hover:border-green-600"
        value={form.email}
       
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
        className="border px-4 py-2 rounded-xl mb-6 w-5/7 border-2 border-green-800  hover:border-green-600"
        value={form.password}
      />

      <button type="submit"
      className="bg-green-600 px-4 py-2 rounded-lg mx-auto text-white font-bold text-lg hover:bg-green-700 "
  
      >Login</button>
 <Link to="/register"
 className="hover:text-green-600"
 >
      <p>Don't have an account ? <span className="text-blue-600">
       
        Register
        

        </span></p>
        </Link>
    </form>
  );
}
