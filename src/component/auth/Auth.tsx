import React, { useState } from "react";
import { useAuth } from ".././context/AuthContext";

const AuthForm: React.FC<{ type: "login" | "register"; onNavigate: (page: string) => void }> = ({ type, onNavigate }) => {
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "", username: "", confirmPassword: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "login") await login(formData);
    else await register(formData);
    onNavigate("articles");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-3">
        {type === "register" && <input placeholder="Username" className="border p-2 w-full" onChange={e => setFormData({ ...formData, username: e.target.value })}/>}
        <input placeholder="Email" className="border p-2 w-full" onChange={e => setFormData({ ...formData, email: e.target.value })}/>
        <input placeholder="Password" type="password" className="border p-2 w-full" onChange={e => setFormData({ ...formData, password: e.target.value })}/>
        {type === "register" && <input placeholder="Confirm Password" type="password" className="border p-2 w-full" onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}/>}
        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded w-full">{type === "login" ? "Login" : "Register"}</button>
      </form>
    </div>
  );
};

export default AuthForm;
