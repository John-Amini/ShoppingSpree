import { Link, Redirect } from 'react-router-dom';
import './Splash.css';

const Splash = ({ user }) => {
  if (user) return <Redirect to='/' />;

  return (
    <div className='splash main'>
      <nav>
        <div className='navbar'>
          <div className='logo'>
            <Link to='/'>HOME</Link>
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
              <h1>Shop Smart Not Hard</h1>
              <p>
                Optimize your shopping!
              </p>
              <Link className='btn signup black' to='/signup'>
                Sign Up
              </Link>
            </div>
          </div>
          <div className='headerRightContainer'>
            {/* <div className='headerRight'>
              <video
                autoPlay
                muted
                controlsList='nodownload nofullscreen noremoteplayback'
                loop
                playsInline
                preload='auto'
                className='headerVideo'
              >
                <source src='/static/splash_phone_vid.mp4' type='video/mp4' />
              </video>
              <img className='headerImage' src='/static/splash_phone_img.png' alt='' />
            </div> */}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Splash;
