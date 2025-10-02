import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AuthForm: React.FC<{ type: "login" | "register"; onNavigate: (page: string) => void }> = ({ type, onNavigate }) => {
  const { login, register, state } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "", username: "", confirmPassword: "" });
  const [error, setError] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (type === "login") {
        await login(formData);
      } else {
        await register(formData);
      }
      onNavigate("articles");
    } catch (err: unknown) {
      // Jika error berupa object dengan key string (validasi)
      if (err && typeof err === "object") {
        setError(err as Record<string, string>);
      } else {
        setError({ general: "Terjadi kesalahan, coba lagi." });
      }
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">{type === "login" ? "Masuk" : "Daftar"}</h2>
        {type === "register" && (
          <>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 border rounded" />
            {error.username && <p className="text-red-500 text-sm">{error.username}</p>}
            {error.general && <p className="text-red-500 text-sm">{error.general}</p>}

          </>
        )}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" />
        {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" />
        {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
        {type === "register" && (
          <>
            <input type="password" name="confirmPassword" placeholder="Konfirmasi Password" onChange={handleChange} className="w-full p-2 border rounded" />
            {error.confirmPassword && <p className="text-red-500 text-sm">{error.confirmPassword}</p>}
          </>
        )}
        <button
  type="submit"
  disabled={state.loading}
  className="bg-sky-500 text-white w-full py-2 rounded-lg hover:bg-sky-600"
>
  {state.loading ? "Loading..." : type === "login" ? "Masuk" : "Daftar"}
</button>

    <button
      type="button"
      onClick={() => onNavigate(type === "login" ? "register" : "login")}
      className="text-sky-600 underline"
    >
      {type === "login" ? "Daftar" : "Masuk"}
    </button>

        <p className="text-sm text-center mt-4">
          {type === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button type="button" onClick={() => onNavigate(type === "login" ? "register" : "login")} className="text-teal-600 underline">
            {type === "login" ? "Daftar" : "Masuk"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
