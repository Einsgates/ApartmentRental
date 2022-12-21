import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './signup.css';

const client = axios.create({
	baseURL: "http://localhost:4000/api/users"
  })
const Signup = () => {
	const [data, setData] = useState({
        email: "",
		userName: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            const id = data.userName;
            const ema = data.email;
			const password = data.password;
			const { data: res } = await client.post(`/?email=${ema}&userName=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`);
			if (res.length !== 0) {
                navigate("/login");
            } else {
                console.log(res.message);
            }
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="loginBox">
			<div>
			<div className="ii" />
				<form className="loginForm" onSubmit={handleSubmit}>
					<h3 className="title">Welcome to UIUC housing System!</h3>
					<br></br>
					<label>userName</label>
					<br></br>
					<input
						type="text"
						placeholder="userName"
						name="userName"
						onChange={handleChange}
						value={data.userName}
					/>
					<br></br>
					<label>Email Address</label>
					<br></br>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={data.email}
					/>
					<br></br>
					<label>Password</label>
					<br></br>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
					/>
					{error && <div>{error}</div>}
					<br></br>
					<br></br>
					<button type="submit" className="signup">
						Sign Up                    
					</button>
					{' '}
				<Link to="/login">
				<button type="button" className="signup">
							Already have an account?
						</button>
				</Link>
				</form>
			</div>
		</div>
	);
};

export default Signup;