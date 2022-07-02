import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";
import { UserLoginDataType } from "../types/userTypes";
import { SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
    const {
      register,
      handleSubmit,
      formState: { errors, isDirty, isValid },
    } = useForm<UserLoginDataType>({
      mode: "onChange",
    });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      if (typeof message === "object") {
        // @ts-ignore
        message.forEach((err: string) => toast.error(err));
      }
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isLoading, isSuccess, isError, message, navigate, dispatch]);



  const onSubmit: SubmitHandler<UserLoginDataType> = (
    data
  ) => {
    dispatch(
      login({
        email: data.email,
        password: data.password,
      })
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="heading">
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Login and start listing movies</p>
      <section className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              className="form-control"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            <p className="form-error">{errors.email && errors.email.message}</p>
            <input
              type="password"
              className="form-control"
              {...register("password", {
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
            />
            <p className="form-error">{errors.password && errors.password.message}</p>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block"
              disabled={!isDirty || !isValid}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default Login;
