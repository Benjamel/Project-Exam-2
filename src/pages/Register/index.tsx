import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { registerValidationSchema } from '../../Handlers/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '../../services/auth/register';
import * as S from '../../App.styles';

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
    <S.registerForm>
      <div className='register-container'>
        <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
          <h1 className='mb-3 text-center'>Register</h1>
          <div className='form-group'>
            <input type='text' placeholder='Name' {...register('name')} />
            <p className='error-message'>{errors.name?.message}</p>
          </div>
          <div className='form-group'>
            <input type='text' placeholder='Email' {...register('email')} />
            <p className='error-message'>{errors.email?.message}</p>
          </div>
          <div className='form-group'>
            <input type='password' placeholder='Password' {...register('password')} />
            <p className='error-message'>{errors.password?.message}</p>
          </div>
          <div className='button-group'>
            <button type='submit'>Register</button>
            <button className='back-button'>
              <Link to='/login'>Go back</Link>
            </button>
          </div>
        </form>
      </div>
    </S.registerForm>
  );
}

export default Register;
