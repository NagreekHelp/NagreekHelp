
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import PasswordInput from "../atoms/Password";
import Dropdown from "../atoms/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../slices/LoadingSlice";
import { registerUser } from "../../slices/authSlice";

function RegisterForm() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading.isLoading); 
  const authLoading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); 
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "User",
    },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      setIsButtonDisabled(true);
      
      console.log(data);
      const resultAction = await dispatch(registerUser(data));

      if (registerUser.fulfilled.match(resultAction)) {
        setToastMessage("Registration successful!");
        setToastType("success");
        setShowToast(true);
        navigate("/login");
      } else {
        setToastMessage(resultAction.payload || "Registration failed");
        setToastType("error");
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("Unexpected error occurred");
      setToastType("error");
      setShowToast(true);
    } finally {
      dispatch(setLoading(false));
      setIsButtonDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex flex-col md:flex-row gap-3 max-md:space-y-3">
        <Input
          placeholder="Enter your first name"
          label="First Name"
          exampleText="e.g. John"
          className="w-full text-form-input p-1"
          {...register("firstName", {
            required: "First name is required",
            pattern: {
              value: /^[A-Za-z\s'-]+$/,
              message: "Only letters, spaces, apostrophes, or hyphens",
            },
          })}
          error={errors.firstName?.message}
        />
        <Input
          placeholder="Enter your last name"
          label="Last Name"
          exampleText="e.g. Doe"
          className="w-full text-form-input p-1"
        />
      </div>

      <Input
        label="Phone Number"
        type="text"
        className="w-full text-form-input p-1"
        placeholder="XXXXXXXXXX"
        exampleText="XXXXXXXXXX"
        {...register("phoneNumber", {
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Phone must be 10 digits",
          },
        })}
        error={errors.phoneNumber?.message}
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        className="w-full text-form-input p-1"
        exampleText="Enter your password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Minimum 8 characters",
          },
        })}
        error={errors.password?.message}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Enter your password again"
        className="w-full text-form-input p-1"
        exampleText="Enter your password again"
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        })}
        error={errors.confirmPassword?.message}
      />

      <Controller
        control={control}
        name="role"
        rules={{ required: "Role is required" }}
        render={({ field, fieldState }) => (
          <Dropdown
            label="Role"
            options={[
              { label: "User", value: "User" },
              { label: "Admin", value: "Admin" },
            ]}
            className="w-full text-form-input p-1"
            {...field}
            error={fieldState.error?.message}
          />
        )}
      />

      <Button
        type="submit"
        text={authLoading || loading ? "Registering..." : "Register"}
        useLoading={authLoading || loading}
        disabled={isButtonDisabled}
        className={`text-button-primary bg-primary-green w-full mt-3 rounded py-3 ${
          isButtonDisabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
      />

      {error && (
        <p className="text-red-500 text-center text-sm">{error}</p>
      )}

      <p className="self-center text-center text-caption-2">
        Already have an account?{" "}
        <Link className="underline font-semibold text-black" to="/login">
          LOGIN HERE
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
