import {Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import './navbar.scss';

const withouRoutes = ["/login"];
const withousignupRoutes = ["/signup"];
export default function App() {
  // const navigate = useNavigate();
  const {pathname} = useLocation();

  const handleLogout = () => {
		localStorage.removeItem("userToken");
	};

  let text = "log in";

  if (localStorage.getItem("userToken")){
      text = "log out";
  }

  if (withouRoutes.some((item) => pathname.includes(item))) return <div>
  <nav>
      <p className='link'>
          <Link to="/search" className='searchLink'>Search</Link>
          <Link to="/gallery" className='galleryLink'>Gallery</Link>
          <Link to="/favorite" className='favoriteLink'>Favorites</Link>
      </p>
  </nav>
</div>

if (withousignupRoutes.some((item) => pathname.includes(item))) return <div>
<nav>
    <p className='link'>
        <Link to="/search" className='searchLink'>Search</Link>
        <Link to="/gallery" className='galleryLink'>Gallery</Link>
        <Link to="/favorite" className='favoriteLink'>Favorites</Link>
    </p>
</nav>
</div>

  return (
    
    <div>
        <nav>
            <p className='link'>
                <Link to="/search" className='searchLink'>Search</Link>
                <Link to="/gallery" className='galleryLink'>Gallery</Link>
                <Link to="/favorite" className='favoriteLink'>Favorites</Link>
                <Link to="/login" className='logout' onClick={handleLogout}>{text}</Link>
            </p>
        </nav>
    </div>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

