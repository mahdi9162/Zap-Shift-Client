import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {
  const { signInWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|]).{8,15}$/;

  const handleLoginForm = (data) => {
    signInWithEmail(data.email, data.password)
      .then((res) => {
        const userData = res.user;
        alert('Signin successful! Welcome ' + userData?.displayName);
        navigate(location?.state || '/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <div>
        <h3 className="text-[#03373D] text-4xl font-bold">Welcome Back</h3>
        <p className="text-[#03373D] mt-1.5 mb-8 text-sm">Login with ZapShift</p>
      </div>
      <form onSubmit={handleSubmit(handleLoginForm)}>
        <fieldset className="fieldset gap-2.5">
          {/* Email */}
          <label className="label -mb-2">Email</label>
          <input type="email" {...register('email', { required: true })} className="input w-96" placeholder="Enter Your Email" />
          {errors.email?.type === 'required' && <p className="text-xs text-red-500">Email address is required.</p>}
          {/* Pass */}
          <label className="label -mb-2 mt-2">Password</label>
          <input
            type="password"
            {...register('password', { required: true, minLength: 8, maxLength: 15, pattern: passValidation })}
            className="input w-96"
            placeholder="Enter Your Password"
          />
          {errors.password?.type === 'required' && <p className="text-red-500 text-xs">Password is required.</p>}
          {errors.password?.type === 'minLength' && <p className="text-red-500 text-xs">Password must be at least 8 characters.</p>}
          {errors.password?.type === 'maxLength' && <p className="text-red-500 text-xs">Password cannot exceed 15 characters.</p>}
          {errors.password?.type === 'pattern' && (
            <p className="text-red-500 text-xs">
              Password must include an uppercase letter, <br /> a lowercase letter, a number, and a special character.
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <div>
            <button className="btn btn-neutral w-96 bg-[#caeb66] border-none text-black shadow-lg mt-4 ">Login</button>
          </div>
          <p className="my-2">
            Don’t have any account?{' '}
            <Link to="/register" className="text-[#8FA748]">
              Register
            </Link>
          </p>
        </fieldset>
      </form>
      <SocialLogin>Login with google</SocialLogin>
    </section>
  );
};

export default Login;
