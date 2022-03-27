import { Link, Redirect } from 'react-router-dom';
import './Splash.css';
import logo from "../../images/favicon.jpg"
import image from "../../images/splash.jpg"
const Splash = ({ user }) => {
  if (user) return <Redirect to='/' />;

  return (
    <div className='splash'>
   <nav>
        <div className='navbar splashSpecific'>
          <div>
          <Link className="logo" to='/'><img className='logo'
          src={logo}></img></Link>

          </div>
          <div className='auth'>
            <Link className='btn login' to='/login'>
              Log In
            </Link>
            <Link className='btn signup' to='/signup'>
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      <header className='headerContainer'>
        <div className='header'>
          <div className='headerLeftContainer'>
            <div className='headerLeft'>
              <h1 className='opaque'>Shop Smart Not Hard</h1>
              <p className='opaque'>
                Create the layout of your favorite stores! Plot the items that you want to buy and optimize your path to save time so you can get back to doing the things you love!
              </p>
              {/* <Link className='btn signup black' to='/signup'>
                Sign Up
              </Link> */}


            </div>
          </div>

        </div>
              <div className='splashImageDiv'>
                <img className='headerImage' src={image} alt='' />
                </div>
      </header>
    </div>
  );
};

export default Splash;
