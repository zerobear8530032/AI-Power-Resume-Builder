import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function SkillsForm() {
    const {
        handleSubmit,
        watch,
        register,
        formState: { errors, isSubmitting },
        control,
        setError,
        clearErrors
    } = useForm({
        defaultValues: {
            skills: []
        }
    });

    const { fields: skillFields, append, remove } = useFieldArray({
        control: control,
        name: "skills"
    });

    const deleteFieldHanlder = () => {
        if (skillFields.length != 0) {
            if (confirm(`Delete this skill section: ${skillFields[skillFields.length - 1]?.skillTag || 'Untitled'}?`)) {
                remove(skillFields.length - 1)
            }
        }
    }

    const addFieldHandler = () => {
        append({
            skillTag: "",
            skillName: ""
        })
    }
    const onSubmit = (data) => {
        console.log(data);
        navigate("/build/5");
    }
    const navigate = useNavigate();
    const handleSkip = () => {
        if (confirm("Are you sure you Want to Skip This Section ?")) {
            navigate('/build/5'); // Add your navigation logic here
            console.log("Continuing to next page...");
        }
    };

    return (
        <div className='min-h-screen bg-gray-900 flex justify-center items-start p-4 py-8'>
            <div className='w-full max-w-4xl bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl'>
                {/* Header Section */}
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2'>
                        Skills & Expertise
                    </h1>
                    <p className='text-gray-400 text-sm mb-1'>
                        Showcase your technical and soft skills to stand out
                    </p>
                    <span className='inline-block bg-yellow-900/30 text-yellow-400 text-xs px-3 py-1 rounded-full border border-yellow-700/50'>
                        ⭐ Optional Section
                    </span>
                </div>

                {/* Info Card - Added explanation */}
                <div className='bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-6 flex items-start gap-3'>
                    <span className='text-2xl'>💡</span>
                    <div>
                        <h3 className='text-blue-300 font-semibold mb-1'>How It Works</h3>
                        <p className='text-gray-300 text-sm mb-2'>
                            <strong>Skill Tag:</strong> Category name (e.g., "Programming Languages", "Soft Skills", "Tools & Frameworks")
                        </p>
                        <p className='text-gray-300 text-sm'>
                            <strong>Skill Names:</strong> List your specific skills separated by commas (e.g., "Python, JavaScript, Java")
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
                        Add Skill Section
                    </button>
                    <button
                        type="button"
                        onClick={deleteFieldHanlder}
                        disabled={skillFields.length === 0}
                        className={`flex items-center gap-2 px-5 py-2.5 font-semibold rounded-lg transition shadow-lg ${skillFields.length === 0
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
                {skillFields.length === 0 && (
                    <div className='text-center py-12 mb-6'>
                        <div className='text-6xl mb-4'>🎯</div>
                        <h3 className='text-xl font-semibold text-gray-300 mb-2'>No Skills Added Yet</h3>
                        <p className='text-gray-400 text-sm mb-6'>
                            Click "Add Skill Section" to start building your skillset
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                    {skillFields.map((field, index) => {
                        return (
                            <div
                                key={field.id}
                                className='bg-gray-700/50 border border-gray-600 rounded-xl p-6 space-y-5 relative'
                            >
                                {/* Skill Section Badge */}
                                <div className='absolute -top-3 left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full'>
                                    Skill Section #{index + 1}
                                </div>

                                {/* Skill Tag Field */}
                                <div className='space-y-2'>
                                    <label
                                        htmlFor={`skills.${index}.skillTag`}
                                        className='block text-sm font-medium text-gray-300'
                                    >
                                        Skill Category <span className='text-red-400'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                        placeholder='e.g., Programming Languages, Soft Skills, Design Tools'
                                        {...register(`skills.${index}.skillTag`, { required: "Please enter the skill category" })}
                                    />
                                    {errors.skills?.[index]?.skillTag && (
                                        <span className='text-red-400 text-sm flex items-center gap-1'>
                                            <span>⚠</span> {errors.skills[index]?.skillTag?.message}
                                        </span>
                                    )}
                                </div>

                                {/* Skill Names Field */}
                                <div className='space-y-2'>
                                    <label
                                        htmlFor={`skills.${index}.skillName`}
                                        className='block text-sm font-medium text-gray-300'
                                    >
                                        Skills <span className='text-red-400'>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                        placeholder='e.g., Python, JavaScript, React, Node.js'
                                        {...register(`skills.${index}.skillName`, { required: "Please enter the skill names" })}
                                    />
                                    {errors.skills?.[index]?.skillName && (
                                        <span className='text-red-400 text-sm flex items-center gap-1'>
                                            <span>⚠</span> {errors.skills[index]?.skillName?.message}
                                        </span>
                                    )}
                                    <p className='text-xs text-gray-400 flex items-center gap-1'>
                                        💡 Separate multiple skills with commas
                                    </p>
                                </div>
                            </div>
                        )
                    })}

                    {/* Action Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4 mt-6'>
                        {/* Save Button - Only show when there are entries */}
                        {skillFields.length > 0 && (
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
                                        Save Skills
                                    </span>
                                )}
                            </button>
                        )}

                        {/* Continue Button - Always visible */}
                        {skillFields.length > 0 ?
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

                {/* Example Section - Added helpful examples */}
                <div className='mt-8 pt-6 border-t border-gray-700'>
                    <h3 className='text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2'>
                        <span>📝</span>
                        Example Skill Sections
                    </h3>
                    <div className='grid md:grid-cols-2 gap-4'>
                        <div className='bg-gray-700/50 border border-gray-600 rounded-lg p-4'>
                            <p className='text-blue-400 font-semibold text-sm mb-1'>Programming Languages</p>
                            <p className='text-gray-300 text-sm'>Python, JavaScript, Java, C++, TypeScript</p>
                        </div>
                        <div className='bg-gray-700/50 border border-gray-600 rounded-lg p-4'>
                            <p className='text-purple-400 font-semibold text-sm mb-1'>Frameworks & Libraries</p>
                            <p className='text-gray-300 text-sm'>React, Node.js, Django, TensorFlow, Express</p>
                        </div>
                        <div className='bg-gray-700/50 border border-gray-600 rounded-lg p-4'>
                            <p className='text-green-400 font-semibold text-sm mb-1'>Soft Skills</p>
                            <p className='text-gray-300 text-sm'>Team Leadership, Communication, Problem Solving</p>
                        </div>
                        <div className='bg-gray-700/50 border border-gray-600 rounded-lg p-4'>
                            <p className='text-pink-400 font-semibold text-sm mb-1'>Tools & Platforms</p>
                            <p className='text-gray-300 text-sm'>Git, Docker, AWS, Figma, VS Code</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkillsForm;