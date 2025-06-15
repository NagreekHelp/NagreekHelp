import Input from '../atoms/Input'
import Button from '../atoms/Button'
import PasswordInput from '../atoms/Password';
import { Link, useNavigate } from "react-router-dom";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from "../../slices/LoadingSlice";
import { RootState } from "../../app/store";
import { login } from '../../slices/authSlice';
// import {useAppDispatch} from '../../app/store'
function LoginForm(){
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
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      setIsButtonDisabled(true);
      
      console.log(data);
      const resultAction = await dispatch(login(data));

      if (login.fulfilled.match(resultAction)) {
        setToastMessage("LoggedIn successful!");
        setToastType("success");
        setShowToast(true);
        navigate("/home");
      } else {
        setToastMessage(resultAction.payload || "Log In failed");
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
        <>
          {/* Login form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email input */}
        <Input
        label="Phone Number"
        type="text"
        className="w-full text-form-input p-1"
        placeholder="XXXXXXXXXX"
        exampleText="eg. XXXXXXXXXX"
        {...register("phoneNumber", {
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Phone must be 10 digits",
          },
        })}
        error={errors.phoneNumber?.message}
      />

        {/* Password input */}
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

        {/* Submit button - disabled while toast is showing */}
        
      <Button
        type="submit"
        text={authLoading || loading ? "Logging..." : "Log In"}
        useLoading={authLoading || loading}
        disabled={isButtonDisabled}
        className={`text-button-primary bg-primary-green w-full mt-3 rounded py-3 ${
          isButtonDisabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
      />

      {error && (
        <p className="text-red-500 text-center text-sm">{error}</p>
      )}
        {/* Loading indicator */}
        
        <p className="self-center text-center text-caption-2">
          Don't have an account?{" "}
          <Link
            className="underline font-semibold text-black"
            to="/register"
          >
            CREATE NEW ACCOUNT
          </Link>
        </p>
      </form>
        </>
    )
}

export default LoginForm;