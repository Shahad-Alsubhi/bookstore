import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import "../css/form.css";
import { UserContext } from "../Layout";
const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const OnSubmit = (data) => {
    fetch("http://localhost:5500/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const Res = await res.json();
      if (!res.ok) {
        setErrorMessage(Res.message);
      } else {
        localStorage.setItem("user", Res.token);
        setUser(Res.token);
        navigate("/books/category/all");
      }
    });
  };

  return (
    <div className="modal-box ">
      <form className="card-body " onSubmit={handleSubmit(OnSubmit)} noValidate>
        <h3>Login!</h3>
        {errorMessage && (
          <h4 style={{ margin: "3px", color: "#e25858" }}>{errorMessage}</h4>
        )}
        <div className="form-control">
          <label className="label">Email</label>
          <input
            placeholder="email"
            className="input "
            {...register("email", {
              required: "email is required",
            })}
          />
          <p style={{ marginTop: "3px", color: "#e25858" }}>
            {errors.email?.message}
          </p>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
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
          <button className="register-btn " type="submit">
            Login
          </button>
        </div>
        <p>
          Do not have an account ?{" "}
          <NavLink to="/books/Signup"> Signup </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
