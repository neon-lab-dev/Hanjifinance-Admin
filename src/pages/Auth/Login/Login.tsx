/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch } from "react-redux";
import PasswordInput from "../../../component/Reusable/PasswordInput/PasswordInput";
import TextInput from "../../../component/Reusable/TextInput/TextInput";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../../component/Reusable/Button/Button";
import { useLoginMutation } from "../../../redux/Features/Auth/authApi";
import { toast } from "sonner";
import { setUser } from "../../../redux/Features/Auth/authSlice";
import { useNavigate } from "react-router-dom";

type TFormData = {
  email: string;
  password: string;
};
const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormData>();

  const handleLogin: SubmitHandler<TFormData> = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await login(loginData).unwrap();
      reset();
      const user = res?.data?.user;
      const token = res?.data?.accessToken;
      toast.success("Logged in successfully.");

      // Setting the user in Redux state
      dispatch(setUser({ user, token }));
      navigate("/dashboard/blogs");
    } catch (err) {
      toast.error("Invalid email or password!");
    }
  };
  return (
    <div className="bg-neutral-150  h-screen flex flex-col justify-center items-center font-Montserrat">
      <div className="rounded-2xl p-6 w-full md:w-[400px] lg:w-[480px] bg-white">
        <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-6 lg:gap-5"
      >
        <h1 className="text-neutral-140 leading-5 font-semibold text-center text-xl mb-3">
         Welcome Back
        </h1>
        <TextInput
          label="Email"
          type="email"
          placeholder="you@email.com"
          error={errors.email}
          {...register("email", {
            required: "Email is required",
          })}
        />

        <div className="flex flex-col gap-[6px]">
          <PasswordInput
            label="Password"
            placeholder="Must be at least 8 Characters"
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />

          {/* <div className="flex justify-end">
            <button className="text-primary-20 font-semibold hover:underline cursor-pointer">
              Forgot Password?
            </button>
          </div> */}
        </div>

        <Button
          type="submit"
          label="Login"
          variant="primary"
          classNames="w-full"
          isLoading={isLoading}
        />
        {/* <p className="text-neutral-140 leading-5 mt-2 text-center">
          New to HanjiFinance?{" "}
          <button
            type="button"
            className="text-primary-20 font-semibold hover:underline cursor-pointer"
          >
            Signup
          </button>
        </p> */}
      </form>
      </div>
    </div>
  );
};

export default Login;
