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

export const ProductCard = styled(ReusableStyles)`
  a {
    text-decoration: none;
    color: #fff;
    margin-bottom: 15px;
    padding: 5px;
    border: 0.05px solid #fff;
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
