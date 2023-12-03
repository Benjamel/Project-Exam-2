import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginValidationSchema } from '../../Handlers/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../services/auth/login';
import * as S from '../../App.styles';

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
    <S.loginForm>
      <div className='login-container'>
        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
          <h1 className='mb-4 text-center'>Login</h1>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='Email' {...register('email')} />
            <p className='error-message'>{errors.email?.message}</p>
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='Password' {...register('password')} />
            <p className='error-message'>{errors.password?.message}</p>
          </div>
          <div className='button-group'>
            <button type='submit'>Login</button>
            <button className='register-link'>
              <Link to='/register'>Register</Link>
            </button>
          </div>
        </form>
      </div>
    </S.loginForm>
  );
}

export default Login;
