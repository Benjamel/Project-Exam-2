import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { registerValidationSchema } from '../../Handlers/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '../../services/auth/register';

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = async (data: { name: string; email: string; password: string }) => {
    try {
      await registerUser(data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
      <div>
        <input type='text' placeholder='Name' {...register('name')} />
        <p>{errors.name?.message}</p>
      </div>
      <div>
        <input type='text' placeholder='Email' {...register('email')} />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <input type='password' placeholder='Password' {...register('password')} />
        <p>{errors.password?.message}</p>
      </div>
      <button>
        <Link className='text-white hover:text-white' to='/login'>
          Go back
        </Link>
      </button>
      <button type='submit'>Register</button>
    </form>
  );
}

export default Register;
