import { BaseUrl } from "../config/BaseUrl";
import Planet1 from "../assets/Planet.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        let item = { email, password };

        const result = await axios.post(BaseUrl + "/admin/signin", item);
        if (!result.data.token) {
            alert("login failed");
        } else {
            localStorage.setItem("token", result.data.token);
            alert("login Successfully")
            navigate('/dashboard');

        }
    };

    return (
        <div className="flex h-screen justify-center items-center bg-cover bg-center">
            <div className="w-full border-2 shadow-lg max-w-md bg-white p-8 rounded-lg ">
                <div className="flex flex-col items-center mb-6">
                    <div className="flex flex-col items-center mb-6">
                        <div className="bg-slate-300 object-cover flex justify-center items-center  rounded-full p-2">
                            <img src={Planet1} alt="My Icon" className="h-12 w-12 " />
                        </div>
                        <h1 className="text-2xl font-bold mt-4">Sign in</h1>
                    </div>
                </div>

                <form className="w-full" noValidate onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            autoComplete="email"
                            autoFocus
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            onChange={(e) => SetEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            required
                            autoComplete="current-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            onChange={(e) => SetPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-blue-500 hover:underline">
                            Forgot password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                        Sign In
                    </button>
                    <div className="mt-4 text-center">
                        <a href="#" className="text-sm text-blue-500 hover:underline">
                            {"Don't have an account? Sign Up"}
                        </a>
                    </div>
                </form>
                <footer className="text-center mt-6">
                    <p className="text-gray-500">
                        {"Copyright © "}
                        <a
                            href="https://mui.com/"
                            className="text-blue-500 hover:underline"
                        >
                            Your Website
                        </a>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </p>
                </footer>
            </div>
        </div>
    );
}