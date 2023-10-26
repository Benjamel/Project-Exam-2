import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginValidationSchema } from '../../Handlers/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../services/auth/login';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await loginUser(data);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div>
          <label htmlFor='email'></label>
          <input type='email' placeholder='Email' {...register('email')} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor='password'></label>
          <input type='password' placeholder='Password' {...register('password')} />
          <p>{errors.password?.message}</p>
        </div>
        <button type='submit'>Login</button>
        <button>
          <Link className='text-white hover:text-white' to='/register'>
            Register
          </Link>
        </button>
      </form>
    </div>
  );
}

export default Login;
