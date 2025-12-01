import { React, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        clearErrors,
        setError,
        formState: { errors, isSubmitting }
    } = useForm();
    const navigate = useNavigate();
    
    const onSubmit = async (data) => {
        try {
            const password = data["password"];
            const cpassword = data["confirm_password"];
            if (password !== cpassword) {
                setError("password", { message: "Password & Confirm Password does not match" })
                setError("confirm_password", { message: "Password & Confirm Password does not match" })
            } else {
                console.log("sending request !");
                const response = await registerUser(data.username, data.email, data.password);
                const status = response.success;
                console.log(response);
                if (status == false) {
                    const message = response.message;
                    const fieldnames = response.fields;
                    for(const field of fieldnames){
                        setError(field, { message: message });
                    }
                } else {
                    navigate("/login");
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    const toggleShowPassword = () => {
        setShowPassword((prevstate) => !prevstate);
    }

    async function registerUser(username, email, password) {
        const response = await fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include", 
            body: JSON.stringify({ username: username, email: email, password: password })
        });
        const json_response = await response.json();
        return json_response;
    }
    
    return (
        <>
            <div className='flex justify-center items-center min-h-full bg-gray-900 p-4'>
                <div className='w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-6'>
                        {/* Header */}
                        <div className='text-center mb-4'>
                            <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2'>
                                SIGN UP
                            </h1>
                            <p className='text-gray-400 text-sm'>Create your ResumeAI account</p>
                        </div>

                        {/* Username Field */}
                        <div className='space-y-2'>
                            <label htmlFor="username" className='block text-sm font-medium text-gray-300'>
                                Username
                            </label>
                            <input 
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                                type="text" 
                                {...register("username", { required: { message: "Username is required", value: true } })} 
                                placeholder='Enter your username' 
                            />
                            {errors.username && (
                                <span className='text-red-400 text-sm flex items-center gap-1'>
                                    <span>⚠</span> {errors.username?.message}
                                </span>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className='space-y-2'>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-300'>
                                Email
                            </label>
                            <input 
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                                type="email" 
                                {...register("email", { required: { message: "Email is required", value: true } })} 
                                placeholder='Enter your email' 
                            />
                            {errors.email && (
                                <span className='text-red-400 text-sm flex items-center gap-1'>
                                    <span>⚠</span> {errors.email?.message}
                                </span>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className='space-y-2'>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-300'>
                                Password
                            </label>
                            <div className='relative'>
                                <input 
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12" 
                                    type={showPassword ? "text" : "password"} 
                                    {...register("password", { required: { message: "Password is required", value: true } })} 
                                    placeholder='Enter your password' 
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition'
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                            <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                            <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <span className='text-red-400 text-sm flex items-center gap-1'>
                                    <span>⚠</span> {errors.password?.message}
                                </span>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className='space-y-2'>
                            <label htmlFor="confirm_password" className='block text-sm font-medium text-gray-300'>
                                Confirm Password
                            </label>
                            <div className='relative'>
                                <input 
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12" 
                                    type={showPassword ? "text" : "password"} 
                                    {...register("confirm_password", { required: { message: "Please confirm your password", value: true } })} 
                                    placeholder='Re-enter your password' 
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition'
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                            <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                            <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.confirm_password && (
                                <span className='text-red-400 text-sm flex items-center gap-1'>
                                    <span>⚠</span> {errors.confirm_password?.message}
                                </span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            className={`w-full py-3 rounded-lg font-semibold text-lg transition ${
                                isSubmitting 
                                    ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
                                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                            }`}
                        >
                        {isSubmitting ? "Creating Account..." : "Sign Up"}
                        </button>

                        {/* Link */}
                        <div className='text-center'>
                            <p className='text-gray-400 text-sm'>
                                Already have an account?{' '}
                                <NavLink 
                                    to="/login" 
                                    className='text-blue-400 hover:text-blue-300 font-semibold transition underline'
                                >
                                    Sign in here
                                </NavLink>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterForm