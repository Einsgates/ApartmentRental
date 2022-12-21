
import { Route, Routes, Navigate} from "react-router-dom";
import LoginForm from "./components/Login";
import Signup from "./components/signUp/signup";
import Search from"./pages/search";
import NavBar from './pages/navbar';
import Gallery from './pages/gallery'
import ApartmentDetail from "./pages/apartmentDetail";
import Favorite from "./components/favorite";

function App() {
	const user = localStorage.getItem("userToken")
	const erase = localStorage.setItem("userToken", "")
	return (
		<div className="App">
		<NavBar navTitle="PokeAPI"/>
		<Routes>
	        {user && <Route path="/" exact element={<Search />} />}
			<Route exact path="/login" element={<><LoginForm/></>}/>
			<Route exact path="/favorite" element={<><Favorite/></>}/>
			<Route exact path="/signup" element={<><Signup/></>}/>
			<Route exact path="/search" element={<><Search/></>}/>
			<Route exact path="/gallery" element={<><Gallery/></>}/>
			<Route exact path="/apartmentDetail/:id" element={<><ApartmentDetail/></>}/>
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
		</div>
	);
}

export default App;
