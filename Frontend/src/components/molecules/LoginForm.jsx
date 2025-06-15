import Input from '../atoms/Input'
import Button from '../atoms/Button'
import PasswordInput from '../atoms/Password';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from "../../slices/LoadingSlice";
import { RootState } from "../../app/store";
// import {useAppDispatch} from '../../app/store'
function LoginForm(){
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const {register, handleSubmit , formState} = useForm();
    return (
        <>
          {/* Login form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email input */}
        <Input
          label="Email"
          type="text"
          className="w-full text-form-input p-1"
          placeholder="you@example.com"
          exampleText="e.g. username@domain.com"
          
        />

        {/* Password input */}
        <div className="space-y-1">
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            className="w-full text-form-input p-1"
            exampleText="Enter your password"
            
          />
        </div>

        {/* Submit button - disabled while toast is showing */}
        <Button
          type="submit"
          text="Log In"
          useLoading={loading}
          disabled={isButtonDisabled}
          className={`text-button-primary bg-primary-green w-full mt-3 rounded py-3 ${
            isButtonDisabled ? "opacity-70 cursor-not-allowed" : ""
          }`}
        />
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