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

  .venue {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
  }

  .venue-image {
    max-width: 400px;
    object-fit: cover;
    border-radius: 10px;
  }

  .venue-details {
    padding: 10px;
  }

  .venue-details h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .venue-details p {
    margin-bottom: 10px;
  }

  .venue-details button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .owner {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .owner-avatar {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }

  .owner-details {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }

  .owner h2 {
    font-size: 20px;
  }

  .owner p {
    margin: 0;
  }

  .info {
    margin-bottom: 20px;
  }

  .info h2,
  .location h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .info-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 350px;
  }

  .info,
  .location {
    flex: 1;
    margin: 0px;
  }

  @media (min-width: 768px) {
    .info-location-container {
      flex-direction: column;
      align-items: center;
    }

    .info,
    .location {
      width: 100%;
      margin: 10px 0;
    }

    .venue {
      flex-direction: row;
      align-items: flex-start;
    }

    .venue-details {
      max-width: none;
      width: 100%;
      text-align: center;
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

//Profile Page

export const profilePage = styled.div`
  .profile {
    display: flex;
    justify-content: center;
    gap: 50px;
    margin: 50px 0;
  }

  .profile-info {
    display: flex;
    align-items: left;
    justify-content: center;
  }

  .profile img {
    margin-right: 10px;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
  }
`;
