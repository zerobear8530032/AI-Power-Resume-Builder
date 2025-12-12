import React, { useState } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProjectTechStackField from './techStackField';
import AITextField from './AITextField';

function ProjectForm() {
    const {
        handleSubmit,
        watch,
        register,
        formState: { errors, isSubmitting },
        control,
        setError,
        clearErrors
    } = useForm({});

    const { fields: projectFields, append, remove } = useFieldArray({
        control: control,
        name: "projects"
    });

    const deleteFieldHanlder = () => {
        console.log(projectFields)
        if (projectFields.length != 0) {
            if (confirm(`Delete this project: ${projectFields[projectFields.length - 1]?.projectTitle || 'Untitled'}?`)) {
                remove(projectFields.length - 1)
            }
        }
    }

    const addFieldHandler = () => {
        append(
            {
                projectTitle: "",
                projectDescription: "",
                techStacks: [""],
                codeURL: "",
                deployedURL: ""
            }
        )
    }
    const navigate = useNavigate()
    const onSubmit = (data) => {
        console.log(data)
        navigate('/build/6');
        // Add your save logic here
    }

    const handleSkip = () => {
        // Navigate to next page without validation
        if (confirm("Are you sure you Want to Skip This Section ?")) {
            navigate('/build/6'); // Add your navigation logic here
            console.log("Continuing to next page...");
        }
    };

    return (
        <div className='min-h-screen bg-gray-900 flex justify-center items-start p-4 py-8'>
            <div className='w-full max-w-4xl bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl'>
                {/* Header Section */}
                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2'>
                        Showcase Your Projects
                    </h2>
                    <p className='text-gray-400 text-sm mb-1'>
                        Highlight your best work and demonstrate your technical abilities
                    </p>
                    <span className='inline-block bg-yellow-900/30 text-yellow-400 text-xs px-3 py-1 rounded-full border border-yellow-700/50'>
                        ⭐ Optional Section
                    </span>
                </div>

                {/* Info Card */}
                <div className='bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-6 flex items-start gap-3'>
                    <span className='text-2xl'>💡</span>
                    <div>
                        <h3 className='text-blue-300 font-semibold mb-1'>Pro Tip</h3>
                        <p className='text-gray-300 text-sm'>
                            Focus on projects that demonstrate relevant skills. Include live demos and code repositories when possible to make your work verifiable.
                        </p>
                    </div>
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
                        Add Project
                    </button>
                    <button
                        type="button"
                        onClick={deleteFieldHanlder}
                        disabled={projectFields.length === 0}
                        className={`flex items-center gap-2 px-5 py-2.5 font-semibold rounded-lg transition shadow-lg ${projectFields.length === 0
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

                {/* Empty State */}
                {projectFields.length === 0 && (
                    <div className='text-center py-12 mb-6'>
                        <div className='text-6xl mb-4'>🚀</div>
                        <h3 className='text-xl font-semibold text-gray-300 mb-2'>No Projects Added Yet</h3>
                        <p className='text-gray-400 text-sm mb-6'>
                            Click "Add Project" to showcase your work and achievements
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                    {projectFields.map((field, index) => {
                        return (
                            <div
                                className='bg-gray-700/50 border border-gray-600 rounded-xl p-6 space-y-5 relative'
                                key={field.id}
                            >
                                {/* Project Badge */}
                                <div className='absolute -top-3 left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full'>
                                    Project #{index + 1}
                                </div>

                                {/* Project Title */}
                                <div className='space-y-2'>
                                    <label
                                        htmlFor={`projects.${index}.projectTitle`}
                                        className='block text-sm font-medium text-gray-300'
                                    >
                                        Project Title <span className='text-red-400'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                        placeholder='e.g., AI Resume Builder, E-commerce Platform'
                                        {...register(`projects.${index}.projectTitle`, { required: "Please enter the project name" })}
                                    />
                                    {errors.projects?.[index]?.projectTitle && (
                                        <span className='text-red-400 text-sm flex items-center gap-1'>
                                            <span>⚠</span> {errors.projects[index]?.projectTitle?.message}
                                        </span>
                                    )}
                                </div>

                                {/* Project Description */}
                                <div className='space-y-2'>
                                    <label
                                        htmlFor={`projects.${index}.projectDescription`}
                                        className='block text-sm font-medium text-gray-300'
                                    >
                                        Project Description <span className='text-red-400'>*</span>
                                    </label>
                                    <Controller
                                        name={`projects.${index}.description`}
                                        control={control}
                                        defaultValue={{ userText: "", aiText: "" }}
                                        rules={{ required: "Description is required" }}
                                        render={({ field }) => (
                                            <AITextField {...field} placeHolder={"Developed a full-stack e-commerce platform enabling 1000+ daily transactions. Built responsive frontend using React and Redux, integrated Stripe payment gateway, and designed RESTful APIs with Node.js and MongoDB. Implemented user authentication, real-time inventory tracking, and admin dashboard. Improved page load speed by 45% through code optimization and lazy loading. Deployed on AWS with CI/CD pipeline using GitHub Actions."}/>
                                        )}
                                    />
                                </div>

                                {/* Tech Stack */}
                                <ProjectTechStackField index={index} control={control} register={register} errors={errors} />

                                {/* URLs in Grid */}
                                <div className='grid md:grid-cols-2 gap-5'>
                                    {/* Code URL */}
                                    <div className='space-y-2'>
                                        <label
                                            htmlFor={`projects.${index}.codeURL`}
                                            className='block text-sm font-medium text-gray-300'
                                        >
                                            Code Repository <span className='text-gray-500 text-xs'>(Optional)</span>
                                        </label>
                                        <input
                                            type="url"
                                            className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                            placeholder='GitHub, GitLab, CodeSandbox URL'
                                            {...register(`projects.${index}.codeURL`, {
                                                pattern: {
                                                    value: /^(https?:\/\/)?[\w.-]+(\.[\w.-]+)+[/#?]?.*$/,
                                                    message: "Enter a valid URL"
                                                }
                                            })}
                                        />
                                        {errors.projects?.[index]?.codeURL && (
                                            <span className='text-red-400 text-sm flex items-center gap-1'>
                                                <span>⚠</span> {errors.projects[index]?.codeURL?.message}
                                            </span>
                                        )}
                                    </div>

                                    {/* Deployed URL */}
                                    <div className='space-y-2'>
                                        <label
                                            htmlFor={`projects.${index}.deployedURL`}
                                            className='block text-sm font-medium text-gray-300'
                                        >
                                            Live Demo <span className='text-gray-500 text-xs'>(Optional)</span>
                                        </label>
                                        <input
                                            type="url"
                                            className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                            placeholder='Vercel, Netlify, Render URL'
                                            {...register(`projects.${index}.deployedURL`, {
                                                pattern: {
                                                    value: /^(https?:\/\/)?[\w.-]+(\.[\w.-]+)+[/#?]?.*$/,
                                                    message: "Enter a valid URL"
                                                }
                                            })}
                                        />
                                        {errors.projects?.[index]?.deployedURL && (
                                            <span className='text-red-400 text-sm flex items-center gap-1'>
                                                <span>⚠</span> {errors.projects[index]?.deployedURL?.message}
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
                        {projectFields.length > 0 && (
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
                                        Save Projects
                                    </span>
                                )}
                            </button>
                        )}

                        {/* Continue Button - Always visible */}
                        {projectFields.length > 0 ?
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

                {/* Example Section */}
                <div className='mt-8 pt-6 border-t border-gray-700'>
                    <h3 className='text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2'>
                        <span>📝</span>
                        Example Project Entry
                    </h3>
                    <div className='bg-gray-700/50 border border-gray-600 rounded-lg p-4'>
                        <p className='text-blue-400 font-semibold mb-2'>AI-Powered Resume Builder</p>
                        <p className='text-gray-300 text-sm mb-3 leading-relaxed'>
                            Developed a full-stack web application that uses AI to generate optimized resumes. Implemented features like real-time editing, PDF export, and AI-powered content suggestions. Reduced resume creation time by 60%.
                        </p>
                        <p className='text-gray-400 text-xs'>
                            <strong>Tech Stack:</strong> React, Node.js, Express, MongoDB, OpenAI API, TailwindCSS
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectForm;