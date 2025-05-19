import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [emailId, setEmail] = useState("sneha@singh.com");
    const [password, setPassword] = useState("NewPass@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginCall = async () => {
        try {
            const res = await axios.post("http://localhost:5000/login", {
                emailId,
                password
            }, {
                withCredentials: true
            });
            dispatch(addUser(res.data));
            navigate("/");
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div className="flex justify-center mt-25">
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body mx-auto">
                    <h2 className="card-title">Login</h2>
                    <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input type="email" placeholder="mail@site.com" required value={emailId} onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label className="input validator" >
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            minLength="8"
                            value={password}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <p className="validator-hint hidden">
                        Must be more than 8 characters, including
                        <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                    </p>
                    <div className="validator-hint hidden">Enter valid email address</div>
                    <div className="card-actions justify-end mt-10">
                        <button className="btn btn-primary" onClick={loginCall}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login