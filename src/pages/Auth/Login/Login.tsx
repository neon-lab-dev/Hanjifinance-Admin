import { useDispatch } from "react-redux";
import PasswordInput from "../../../component/Reusable/PasswordInput/PasswordInput";
import TextInput from "../../../component/Reusable/TextInput/TextInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../component/Reusable/Button/Button";

type TFormData = {
  email: string;
  password: string;
};
const Login = () => {
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>();

  const handleLogin = (data: TFormData) => {
    console.log(data);
  };
  return (
    <div className="bg-neutral-150  h-screen flex flex-col justify-center items-center">
      <div className="rounded-2xl p-6 w-full md:w-[400px] lg:w-[480px] bg-white">
        <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-6 lg:gap-5"
      >
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

          <div className="flex justify-end">
            <button className="text-primary-20 font-semibold hover:underline cursor-pointer">
              Forgot Password?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          label="Login"
          variant="primary"
          classNames="w-full"
        />
        <p className="text-neutral-140 leading-5 mt-2 text-center">
          New to HanjiFinance?{" "}
          <button
            type="button"
            className="text-primary-20 font-semibold hover:underline cursor-pointer"
          >
            Signup
          </button>
        </p>
      </form>
      </div>
    </div>
  );
};

export default Login;
