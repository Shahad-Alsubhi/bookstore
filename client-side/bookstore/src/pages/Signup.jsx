import { NavLink,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {  useState } from "react";
const Signup = () => {
 
    const [errorMessage,setErrorMessage]=useState('');
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    
    const navigate = useNavigate();

  
    const OnSubmits =  (data) => {
      fetch('http://localhost:5500/auth/signup',{
          method:'POST',headers:{"Content-Type":"application/json"},
          body:JSON.stringify(data)
      }).then(async(res)=>{
        if(!res.ok){
           const errorRes=await res.json();
          setErrorMessage(errorRes.message)}
          else{
            navigate("/books")
        }
      })
    };
  
    return (
        <div className="modal-box ">
  
          <form
            className="card-body "
            onSubmit={handleSubmit(OnSubmits)}
            noValidate
          >
  
            <h3>Sign up </h3>
            {errorMessage && <h4 style={{margin: "3px", color: "#e25858" }}>{errorMessage}</h4>
            }
              <div className="form-control">
              <label className="label">
                  Username 
              </label>
              <input
                placeholder="username"
                className="input"
                {...register("userName", {
                  required: "Username is required",
                
                })}
              />
              <p style={{ marginTop: "3px", color: "#e25858" }}>{errors.userName?.message}</p>
            </div>
            <div className="form-control">
              <label className="label">
                  Email
              </label>
              <input
                placeholder="email"
                className="input "
                {...register("email", {
                  required: "email is required",
                  // pattern: {
                  //   value: /^[a-z]*$/,
                  //   message: "Invalid email format",
                  // },
                })}
              />
              <p style={{ marginTop: "3px", color: "#e25858" }}>{errors.email?.message}</p>
            </div>
            <div className="form-control">
              <label className="label">
                  Password
              </label>
              <input
                type="password"
                placeholder="password"
                className="input "
                required
                {...register("password", {
                  required: "password is required",
                })}
              />
             
              <p style={{ marginTop: "3px", color: "#e25858" }}>
                {errors.password?.message}
              </p>
            </div>
            <div className="form-control ">
              <button className="register-btn" type="submit" >
                Sign up
                
              </button>
            </div>
            <p>
              Already have an account ? <NavLink to="/books/login" > login </NavLink>
            </p>
          </form>
        </div>
    );
}

export default Signup
