import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import image1 from './label.jpg';

const client = axios.create({
	baseURL: "http://localhost:4000/api/auth"
  })
  
const Login = () => {
	const [data, setData] = useState({ 
		userName: "", 
		password: "" 
	});

	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const navigate = useNavigate();

	let axiosConfig = {
		headers: {
			'Content-Type' : 'application/json; charset=UTF-8',
			'Accept': 'Token',
			"Access-Control-Allow-Origin": "*",
		}
	  };

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			const id = data.userName;
			const password = data.password;
			const { data: res } = await client.post(`/?userName=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`);
			if (res.length !== 0) {
				localStorage.setItem('userToken', res.data.token)
				localStorage.setItem('userName', res.data.userName)
				navigate("/favorite")
			} else {
				console.log("pupu");
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
			<img className="ii" src={image1} />
				<form className="loginForm" onSubmit={handleSubmit}>
					<h3 className="title">Welcome to UIUC housing system!</h3>
					<br></br>
					<div className="loginInfo">
					<label>userName:</label>
					<br></br>
					<input
						type="userName"
						placeholder="userName"
						name="userName"
						onChange={handleChange}
						value={data.userName}
					/>
					</div>
					<div className="loginInfo">
					<label>Password:</label>
					<br></br>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
					/>
					</div>
					{error && <div>{error}</div>}
					<br></br>
					<button type="submit" onClick = {Login} className="submitbutton">
						Sign In
					</button>
				<Link to="/signup" className="signup">
				<h4> </h4>
				<h4>Don't have an account?</h4>
				</Link>
				</form>
			</div>
		</div>
	);
};

export default Login;