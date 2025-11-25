import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../../components/Logo/Logo';
import Container from '../../../components/Container/Container';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
  const { user, userSignOut } = useAuth();

  const links = (
    <>
      <li>
        <NavLink>Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
      <li>
        <NavLink>Pricing</NavLink>
      </li>
      <li>
        <NavLink>Blog</NavLink>
      </li>
      <li>
        <NavLink>Contact</NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    userSignOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <div className="navbar bg-base-100 shadow-sm rounded-2xl mt-7 mb-9 px-8 py-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {' '}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{' '}
              </svg>
            </div>
            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <div>
            <Logo></Logo>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-4">
          {user && (
            <div>
              <div className="avatar avatar-online">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </div>
            </div>
          )}
          {user ? (
            <Link onClick={handleLogOut} className="btn rounded-xl">
              Sign Out
            </Link>
          ) : (
            <Link to="/login" className="btn rounded-xl">
              Sign In
            </Link>
          )}
          <Link to="/rider" className="btn bg-[#caeb66] rounded-xl">
            Be a Rider
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
