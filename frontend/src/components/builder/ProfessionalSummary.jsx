import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function ProfessionalSummary() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
        setError,
        clearErrors,
        setValue,
    } = useForm({});

    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data); // placeholder for AI optimization
        navigate("/build/3")
    };
    const handleOptimize = () => {
        const formdata = getValues("professionalSummary");
        if (formdata == undefined || formdata.trim().length === 0) {
            setError("professionalSummary", { type: "manual", message: "please enter some data first !" });
            return;
        }
        clearErrors("professionalSummary");
        // this optimzie data willcome from the api from backend of llm to optimze data for resume 
        setValue("professionalSummary", "optimize data", { shouldValidate: true });
    };

    return (
        <div className='min-h-screen bg-gray-900 flex justify-center items-center p-4'>
            <div className='w-full max-w-3xl bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl'>
                {/* Header Section */}
                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-3'>
                        Craft Your Professional Summary
                    </h2>
                    <p className='text-gray-400 text-base leading-relaxed'>
                        Write a brief paragraph highlighting your experience, skills, and career goals. 
                        <span className='text-blue-400 font-semibold'> AI will help optimize it</span> for your resume.
                    </p>
                </div>

                {/* Info Card */}
                <div className='bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-6 flex items-start gap-3'>
                    <span className='text-2xl'>💡</span>
                    <div>
                        <h3 className='text-blue-300 font-semibold mb-1'>Pro Tip</h3>
                        <p className='text-gray-300 text-sm'>
                            Focus on your key achievements, relevant skills, and what makes you unique. 
                            Keep it concise (3-5 sentences) and tailored to your target role.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    {/* Textarea Field */}
                    <div className='space-y-2'>
                        <label 
                            htmlFor="profsummary" 
                            className='block text-sm font-medium text-gray-300 flex items-center gap-2'
                        >
                            Professional Summary 
                            <span className='text-red-400'>*</span>
                        </label>
                        <textarea
                            {...register("professionalSummary", { 
                                required: { value: true, message: "Please enter your summary" } 
                            })}
                            id="profsummary"
                            rows={8}
                            className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none'
                            placeholder="Ex: Experienced software engineer with 5+ years in AI and web development. Passionate about building scalable applications and leveraging machine learning to solve real-world problems. Proven track record of leading cross-functional teams and delivering high-impact projects."
                        />
                        {errors.professionalSummary && (
                            <span className='text-red-400 text-sm flex items-center gap-1'>
                                <span>⚠</span> {errors.professionalSummary.message}
                            </span>
                        )}
                        
                        {/* Character Counter */}
                        <div className='flex justify-between items-center text-xs text-gray-400'>
                            <span>💡 Aim for 300-500 characters for best results</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col sm:flex-row justify-center gap-4 pt-4'>
                        <button 
                            type="button" 
                            onClick={handleOptimize}
                            className='px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 shadow-lg'
                        >
                            <span className='text-xl'>✨</span>
                            Optimize with AI
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`px-6 py-3 font-semibold rounded-lg transition flex items-center justify-center gap-2 ${
                                isSubmitting 
                                    ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
                                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className='animate-spin'>⏳</span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <span>💾</span>
                                    Save & Continue
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Example Section */}
                <div className='mt-8 pt-6 border-t border-gray-700'>
                    <h3 className='text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2'>
                        <span>📝</span>
                        Example Summary
                    </h3>
                    <div className='bg-gray-700/50 border border-gray-600 rounded-lg p-4'>
                        <p className='text-gray-300 text-sm leading-relaxed italic'>
                            "Results-driven Full Stack Developer with 5+ years of experience building responsive web applications 
                            using React, Node.js, and cloud technologies. Specialized in creating AI-powered solutions that improve 
                            user experience and drive business growth. Proven ability to collaborate with cross-functional teams 
                            and deliver projects on time and within budget."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfessionalSummary;