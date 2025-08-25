/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import PasswordInput from "../../../component/Reusable/PasswordInput/PasswordInput";
import Button from "../../../component/Reusable/Button/Button";
import { useChangePasswordMutation } from "../../../redux/Features/Auth/authApi";
import { toast } from "sonner";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>();

  const newPasswordValue = watch("newPassword");

  // Separate visibility state for each password input
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword: SubmitHandler<FormValues> = async (data) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Password changed successfully!");
      reset();
    } catch (error: any) {
      const message =
        error?.data?.message || "Failed to change password. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="bg-neutral-150 h-full mt-32 flex flex-col justify-center items-center">
      <div className="rounded-2xl p-6 w-full md:w-[400px] lg:w-[480px] bg-white">
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="flex flex-col gap-6 lg:gap-5"
        >
          {/* Current Password */}
          <PasswordInput
            label="Current Password"
            placeholder="Enter your current password"
            error={errors.currentPassword}
            {...register("currentPassword", {
              required: "Current password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            isPasswordVisible={showCurrentPassword}
            setIsPasswordVisible={setShowCurrentPassword}
          />

          {/* New Password */}
          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            error={errors.newPassword}
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            isPasswordVisible={showNewPassword}
            setIsPasswordVisible={setShowNewPassword}
          />

          {/* Confirm New Password */}
          <PasswordInput
            label="Confirm New Password"
            placeholder="Confirm your new password"
            error={errors.confirmPassword}
            {...register("confirmPassword", {
              required: "Confirm password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: (value) =>
                value === newPasswordValue || "Passwords do not match",
            })}
            isPasswordVisible={showConfirmPassword}
            setIsPasswordVisible={setShowConfirmPassword}
          />

          <Button
            type="submit"
            label="Change Password"
            variant="primary"
            classNames="w-full"
            isLoading={isChangingPassword}
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
