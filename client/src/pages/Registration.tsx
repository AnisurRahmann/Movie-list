import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Spinner from "../components/Spinner";
import { reset, signUp } from "../features/auth/authSlice";
import { UserRegisterDataType } from "../types/userTypes";

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<UserRegisterDataType>({
    mode: "onChange",
  });

  const password = useRef({});
  password.current = watch("password", "");

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

  const onSubmit: SubmitHandler<UserRegisterDataType> = (data) => {
    dispatch(
      signUp({
        name: data.name,
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
        <FaUserAlt /> Sign Up
      </h1>
      <p>Please create and account</p>
      <section className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              placeholder="Name"
              className="form-control"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-z][A-z0-9-_]{3,23}$/,
                  message:
                    "Must begin with a letter.  Letters, numbers, underscores, hyphens allowed.",
                },
              })}
            />
            <p className="form-error">{errors.name && errors.name.message}</p>
            <input
              placeholder="Email"
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
              placeholder="Password"
              type="password"
              className="form-control"
              {...register("password", {
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
                  message:
                    "Must include uppercase and lowercase letters, a number and a special character. Allowed special characters",
                },
              })}
            />
            <p className="form-error">
              {errors.password && errors.password.message}
            </p>
            <input
              placeholder="Confirm Passowrd"
              type="password"
              className="form-control"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
            />
            <p className="form-error">
              {errors.confirmPassword && errors.confirmPassword.message}
            </p>
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
export default Registration;
