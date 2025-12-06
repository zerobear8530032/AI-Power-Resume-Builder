import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import Select from "react-select";
import years from '../utildata/years';
import { useNavigate } from 'react-router-dom';

function EducationForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, },
        getValues,
        control,
        setError,
        clearErrors,
        setValue,
    } = useForm(
        {
            defaultValues: {
                educations: []
            }
        }
    );

    const { fields: educationFields, append, remove } = useFieldArray({
        control,
        name: "educations",
    });

    // Custom styles for Select dropdown to match dark theme
    const customStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: "#374151",
            borderRadius: "0.5rem",
            borderColor: state.isFocused ? "#3b82f6" : "#4b5563",
            boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "none",
            padding: "2px 4px",
            minHeight: "48px",
            cursor: "pointer",
            color: "#f3f4f6",
            "&:hover": {
                borderColor: "#3b82f6"
            }
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#374151",
            borderRadius: "0.5rem",
            overflow: "hidden",
            marginTop: "6px",
            border: "1px solid #4b5563",
            zIndex: 9999,
            maxHeight: "200px"
        }),
        menuList: (base) => ({
            ...base,
            maxHeight: "200px",
            backgroundColor: "#374151"
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "#3b82f6" : state.isFocused ? "#4b5563" : "#374151",
            color: state.isSelected ? "white" : "#f3f4f6",
            padding: "10px 14px",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: state.isSelected ? "#3b82f6" : "#4b5563"
            }
        }),
        placeholder: (base) => ({
            ...base,
            color: "#9ca3af"
        }),
        singleValue: (base) => ({
            ...base,
            color: "#f3f4f6"
        }),
        input: (base) => ({
            ...base,
            color: "#f3f4f6"
        })
    };

    const onSubmit = (data) => {
        console.log(data);
        // Save data if any entries exist, then navigate to next page
        navigate('/build/4');
    };
    const navigate = useNavigate();
    const handleSkip = () => {
        // Navigate to next page without validation
        if (confirm("Are you sure you Want to Skip This Section ?")) {
            navigate('/build/4'); // Add your navigation logic here
            console.log("Continuing to next page...");
        }
    };

    const addFieldHandler = () => {
        append({
            institute: "",
            course: "",
            grades: 0,
            year: "",
        });
    }

    const deleteFieldHanlder = () => {
        remove(educationFields.length - 1)
    }

    return (
        <div className='min-h-screen bg-gray-900 flex justify-center items-start p-4 py-8'>
            <div className='w-full max-w-4xl bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl'>
                {/* Header Section */}
                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2'>
                        Education Background
                    </h2>
                    <p className='text-gray-400 text-sm mb-1'>
                        Add your educational qualifications to strengthen your resume
                    </p>
                    <span className='inline-block bg-yellow-900/30 text-yellow-400 text-xs px-3 py-1 rounded-full border border-yellow-700/50'>
                        ⭐ Optional Section
                    </span>
                </div>

                {/* Add/Delete Controls */}
                <div className="flex flex-wrap gap-3 justify-center mb-8 pb-6 border-b border-gray-700">
                    <button
                        type="button"
                        onClick={addFieldHandler}
                        className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                        </svg>
                        Add Education
                    </button>
                    <button
                        type="button"
                        onClick={deleteFieldHanlder}
                        disabled={educationFields.length === 0}
                        className={`flex items-center gap-2 px-5 py-2.5 font-semibold rounded-lg transition shadow-lg ${educationFields.length === 0
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700 text-white'
                            }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                        </svg>
                        Remove Last
                    </button>
                </div>

                {/* Empty State - Added message when no education entries */}
                {educationFields.length === 0 && (
                    <div className='text-center py-12 mb-6'>
                        <div className='text-6xl mb-4'>🎓</div>
                        <h3 className='text-xl font-semibold text-gray-300 mb-2'>No Education Added Yet</h3>
                        <p className='text-gray-400 text-sm mb-6'>
                            Click "Add Education" to start building your academic profile
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                    {educationFields.map((field, index) => {
                        return (
                            <div
                                className='bg-gray-700/50 border border-gray-600 rounded-xl p-6 space-y-5 relative'
                                key={field.id}
                            >
                                {/* Education Entry Number - Added badge for each entry */}
                                <div className='absolute -top-3 left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full'>
                                    Education #{index + 1}
                                </div>

                                {/* Institute Field */}
                                <div className='space-y-2'>
                                    <label
                                        htmlFor={`educations.${index}.institute`}
                                        className='block text-sm font-medium text-gray-300'
                                    >
                                        Institution Name <span className='text-red-400'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                        placeholder='e.g., Stanford University'
                                        {...register(`educations.${index}.institute`, { required: "Institution name is required" })}
                                        defaultValue={field?.institute || ""}
                                    />
                                    {errors.educations?.[index]?.institute && (
                                        <span className='text-red-400 text-sm flex items-center gap-1'>
                                            <span>⚠</span> {errors.educations[index]?.institute?.message}
                                        </span>
                                    )}
                                </div>

                                {/* Course Field */}
                                <div className='space-y-2'>
                                    <label
                                        htmlFor={`educations.${index}.course`}
                                        className='block text-sm font-medium text-gray-300'
                                    >
                                        Degree / Course <span className='text-red-400'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                        placeholder='e.g., B.Tech in Computer Science'
                                        {...register(`educations.${index}.course`, { required: "Course/Degree is required" })}
                                        defaultValue={field?.course || ""}
                                    />
                                    {errors.educations?.[index]?.course && (
                                        <span className='text-red-400 text-sm flex items-center gap-1'>
                                            <span>⚠</span> {errors.educations[index]?.course?.message}
                                        </span>
                                    )}
                                </div>

                                {/* Year and Grades in Grid - Better layout */}
                                <div className='grid md:grid-cols-2 gap-5'>
                                    {/* Year Field */}
                                    <div className='space-y-2'>
                                        <label
                                            htmlFor={`educations.${index}.year`}
                                            className='block text-sm font-medium text-gray-300'
                                        >
                                            Year <span className='text-red-400'>*</span>
                                        </label>
                                        <Controller
                                            name={`educations.${index}.year`}
                                            control={control}
                                            rules={{ required: "Year is required" }}
                                            render={({ field: selectField }) => {
                                                return (
                                                    <Select
                                                        {...selectField}
                                                        options={years}
                                                        styles={customStyles}
                                                        placeholder="Select year"
                                                        value={years.find(y => y.value === selectField.value)}
                                                        onChange={(selected) => selectField.onChange(selected.value)}
                                                        menuPlacement="auto"
                                                        menuPosition="fixed"
                                                    />
                                                )
                                            }}
                                        />
                                        {errors.educations?.[index]?.year && (
                                            <span className='text-red-400 text-sm flex items-center gap-1'>
                                                <span>⚠</span> {errors.educations[index]?.year?.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Grades Field */}
                                    <div className='space-y-2'>
                                        <label
                                            htmlFor={`educations.${index}.grades`}
                                            className='block text-sm font-medium text-gray-300'
                                        >
                                            Grade / CGPA <span className='text-gray-500 text-xs'>(Optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                            placeholder='e.g., 3.8 GPA or 85'
                                            {...register(`educations.${index}.grades`, {
                                                pattern: {
                                                    value: "/^(100(\.00?)?|[0-9]?\d(\.\d{1,2})?)$/",
                                                    message: "Enter a valid number (0–100) with up to 2 decimals"
                                                }
                                            })} step="0.01"
                                        />
                                        {errors.educations?.[index]?.grades && (
                                            <span className='text-red-400 text-sm flex items-center gap-1'>
                                                <span>⚠</span> {errors.educations[index]?.grades?.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {/* Action Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4 mt-6'>
                        {/* Save Button - Only show when there are entries */}
                        {educationFields.length > 0 && (
                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className={`flex-1 py-3 rounded-lg font-semibold text-lg transition ${isSubmitting
                                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <span className='flex items-center justify-center gap-2'>
                                        <span className='animate-spin'>⏳</span>
                                        Saving...
                                    </span>
                                ) : (
                                    <span className='flex items-center justify-center gap-2'>
                                        <span>💾</span>
                                        Save Education
                                    </span>
                                )}
                            </button>
                        )}

                        {/* Continue Button  */}
                        {educationFields.length > 0 ?
                            <>
                                <button
                                    type='submit'
                                    className='flex-1 py-3 rounded-lg font-semibold text-lg transition bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                                >
                                    <span className='flex items-center justify-center gap-2'>
                                        <span>→</span>
                                        {'Save & Continue'}
                                    </span>
                                </button>
                            </> :
                            <>
                                <button
                                    type='button'
                                    onClick={handleSkip}
                                    className='flex-1 py-3 rounded-lg font-semibold text-lg transition bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                                >
                                    <span className='flex items-center justify-center gap-2'>
                                        <span>→</span>
                                        {'Skip & continue'}
                                    </span>
                                </button>
                            </>}

                    </div>
                </form>
            </div>
        </div>
    )
}

export default EducationForm;