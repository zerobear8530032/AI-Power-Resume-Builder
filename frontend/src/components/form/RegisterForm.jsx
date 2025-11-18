import js from '@eslint/js';
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
    const navigate= useNavigate();
    const onSubmit = async (data) => {
        try {
            const password = data["password"];
            const cpassword = data["confirm_password"];
            if (password !== cpassword) {
                setError("password", { message: "Password & Confirm Password  does not match" })
                setError("confirm_password", { message: "Password & Confirm Password  does not match" })
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
                }else{
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
                'Content-Type': 'application/json', // Indicate that the body is JSON
            },
            credentials: "include", 
            body: JSON.stringify({ username: username, email: email, password: password })
        });
        const json_response = await response.json();
        return json_response;
    }
    return (<>
        <div className='form-container flex justify-center w-[340px] min-h-[550px] backdrop-blur-md  relative h-[80%] p-10 pt-5 border-2 rounded-lg border-white '>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center'>
                <h1 className='form-heading' >SIGN UP</h1>
                <div className='w-full form-fields-container self-start gap-1 flex flex-col '>
                    <label htmlFor="username" className='text-label'> User Name </label>
                    <input className="form-input" type="text" {...register("username", { required: { message: "Field is Required", value: true } })} placeholder='Enter Username' />
                    {errors.username && <span className='form-error-field-msg'>{errors.username?.message}</span>}
                    <div className='h-1 bg-white'></div>
                    <label htmlFor="email" className='text-label'> Email </label>
                    <input className="form-input" type="email" {...register("email", { required: { message: "Field is Required", value: true } })} placeholder='Enter Email' />
                    {errors.email && <span className='form-error-field-msg'>{errors.email?.message}</span>}
                    <div className='h-1 bg-white'></div>
                    <label htmlFor="password" className='text-label'> Password </label>
                    <span className='password-fields'>
                        <input className="form-input" type={showPassword ? "text" : "password"} {...register("password", { required: { message: "Field is Required", value: true } })} placeholder='Enter Password' />
                        {
                            showPassword ?
                                (<svg className='cursor-pointer' onClick={toggleShowPassword} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg>)
                                :
                                (<svg className='cursor-pointer' onClick={toggleShowPassword} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg>)
                        }
                    </span >
                    {errors.password && <span className='form-error-field-msg'>{errors.password?.message}</span>}
                    <div className='h-1 bg-white'></div>

                    <label htmlFor="confirm_password" className='text-label'> Confirm Password </label>
                    <span className='password-fields'>
                        <input className="form-input" type={showPassword ? "text" : "password"} {...register("confirm_password", { required: { message: "Field is Required", value: true } })} placeholder='Re-Enter Password' />
                        {
                            showPassword ?
                                (<svg className='cursor-pointer' onClick={toggleShowPassword} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg>)
                                :
                                (<svg className='cursor-pointer' onClick={toggleShowPassword} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg>)
                        }
                    </span>
                    {errors.confirm_password && <span className='form-error-field-msg'>{errors.confirm_password?.message}</span>}
                    <div className='h-1 bg-white'></div>
                </div>
                <input type="submit" disabled={isSubmitting} className={`mt-5 mb-2 p-5 pt-2 pb-2 text-black font-bold  w-full rounded-full ${isSubmitting ? "bg-gray-700 opacity-75" : "bg-white"}`} value={"Sign Up"} />
                <p className='login-msg'>Already have an Account <NavLink to="/login" className='underline font-extrabold'>click here</NavLink></p>
            </form>
        </div>
    </>)
}

export default RegisterForm