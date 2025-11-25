import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const Register = () => {
  const { signUpWithEmail, updateUserProfile } = useAuth();
  const location = useLocation;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|]).{8,15}$/;

  const handleRegisterForm = (data) => {
    const profileImg = data.photo[0];

    signUpWithEmail(data.email, data.password)
      .then((res) => {
        const userData = res.user;

        // store the image in form data
        const formData = new FormData();
        formData.append('image', profileImg);

        // send the photo to store and get the url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        axios
          .post(image_API_URL, formData)
          .then((imgRes) => {
            const photoUrl = imgRes.data.data.display_url;

            // update user profile
            const userProfile = {
              displayName: data.name,
              photoURL: photoUrl,
            };

            updateUserProfile(userProfile)
              .then(() => {
                alert('Register successful! Welcome ' + userData?.displayName);
                navigate(location.state || '/');
              })
              .catch((error) => {
                console.log('Profile update error:', error);
              });
          })
          .catch((err) => {
            console.log('Image Upload Failed:', err);
            alert('Account created, but image upload failed.');
            navigate('/');
          });
      })
      .catch((error) => {
        console.log('Sign Up Error:', error);
      });
  };

  return (
    <section>
      <div>
        <h3 className="text-[#03373D] text-4xl font-bold">Create an Account</h3>
        <p className="text-[#03373D] mt-1.5 mb-8 text-sm">Register with ZapShift</p>
      </div>
      <form onSubmit={handleSubmit(handleRegisterForm)}>
        <fieldset className="fieldset gap-2.5">
          {/* Name */}
          <label className="label -mb-2">Name</label>
          <input type="text" {...register('name', { minLength: 6, required: true })} className="input w-96" placeholder="Enter Your Name" />
          {errors.name?.type === 'required' && <p className="text-red-500 text-xs">Name is required.</p>}
          {errors.name?.type === 'minLength' && <p className="text-red-500 text-xs">Name must be at least 6 characters.</p>}

          {/* Photo Upload Field */}
          <div className="mt-2">
            <label className="block mb-2 text-xs text-gray-600 ">Profile Picture </label>
            <input
              type="file"
              {...register('photo', { required: true })}
              className="block w-96 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:cursor-pointer file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            {errors.photo?.type === 'required' && <p className="text-red-500 text-xs">Profile picture is required.</p>}
          </div>

          {/* Email */}
          <label className="label -mb-2 mt-2">Email</label>
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
            <button className="btn btn-neutral w-96 bg-[#caeb66] border-none text-black shadow-lg mt-4 ">Register</button>
          </div>
          <p className="my-2">
            Already have an account?
            <Link state={location.state} to="/login" className="text-[#8FA748]">
              Login
            </Link>
          </p>
        </fieldset>
      </form>
      <SocialLogin>Register with Google</SocialLogin>
    </section>
  );
};

export default Register;
