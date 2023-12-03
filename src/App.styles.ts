import styled from 'styled-components';

export const ReusableStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px auto;

  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    img {
      height: 400px;
      width: 100%;
      margin-bottom: 0;
    }
  }
`;

//Home page
export const venueCard = styled(ReusableStyles)`
  a {
    text-decoration: none;
    color: #fff;
    margin-bottom: 15px;
    padding: 5px;
    :hover {
      box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);
    }
  }

  h2 {
    font-size: 22px;
  }

  img {
    width: 350px;
  }
`;

//Product ID page
export const singleVenue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px auto;

  img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }

  .available {
  }

  .booked {
    background-color: red;
    color: white;

    :hover {
      background-color: white;
      color: black;
    }
  }

  .custom-tile-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 768px) {
    img {
      height: 400px;
      width: 100%;
      margin-bottom: 0;
    }
  }
`;

//Login page
export const loginForm = styled.div`
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .login-form {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }

  .error-message {
    color: red;
    margin-top: 5px;
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .register-link {
    background-color: #ccc;
  }

  .register-link a {
    color: black;
    text-decoration: none;
  }

  .button-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

//Register
export const registerForm = styled.div`
  .register-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .register-form {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }

  .error-message {
    color: red;
    margin-top: 5px;
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  }

  .back-button {
    background-color: #ccc;
  }

  .back-button a {
    color: black;
    text-decoration: none;
  }

  .button-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
