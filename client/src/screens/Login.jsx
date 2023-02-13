import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from '../api'; 

const Login = () => {
  const [values, setValues] = useState({
    username: "",
   
    password: "",
   
  });

  const navigate=useNavigate();

  useEffect(() => {
    if (localStorage.getItem('chat-user')) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if (validateForm()) {
    
      const {data}=await login(values);

      if (data.success === false) {
        toast.error(data.message, toastOptions);
      }
      if (data.success === true) {
        localStorage.setItem(
          // process.env.REACT_APP_LOCALHOST_KEY,
          'chat-user',
          JSON.stringify(data.user)
        );
        navigate("/");
      }
  }
}
  const handleChange=(e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password is required.", toastOptions);
      return false;
    }
    return true;
  };


  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className='brand'>
            <img src={Logo} alt="Logo"/>
            <h1>Snappy</h1>

          </div>
          <input 
            type="text" 
            placeholder='Username' 
            name="username" 
            onChange={handleChange}
            min="4"
            
          />
         
          <input 
            type="password" 
            placeholder='Password' 
            name="password" 
            onChange={handleChange}
          />
         
         <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login