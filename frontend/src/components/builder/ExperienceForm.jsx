import React from 'react'
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

function ExperienceForm() {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    watch,
    setError,
    clearErrors,
    control,
  } = useForm(
    {
      defaultValues: {
        experiences: []
      }
    }
  );

  const onSubmit = (data) => {
    console.log(data);
    // Add your save logic here
  }

  const { fields: experienceFields, append, remove } = useFieldArray({
    control: control,
    name: "experiences",
  });

  const deleteFieldHanlder = () => {
    if (experienceFields.length != 0) {
      if (confirm(`Delete this experience: ${experienceFields[experienceFields.length - 1]?.organization || 'Untitled'}?`)) {
        remove(experienceFields.length - 1)
      }
    }
  }

  const addFieldHandler = () => {
    append({
      organization: "",
      role: "",
      duration: "",
      units: "months",
      description: ""
    })
  }
  const navigate = useNavigate();
  const handleSkip = () => {
    // Navigate to next page without validation
    if (confirm("Are you sure you Want to Skip This Section ?")) {
      navigate('/build/7'); // Add your navigation logic here
      console.log("Continuing to next page...");
    }
  };

  return (
    <div className='min-h-screen bg-gray-900 flex justify-center items-start p-4 py-8'>
      <div className='w-full max-w-4xl bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl'>
        {/* Header Section */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2'>
            Professional Experience
          </h1>
          <p className='text-gray-400 text-sm mb-1'>
            Showcase your work history, internships, and relevant professional roles
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
              Use bullet points in the description to highlight key achievements and responsibilities.
              Quantify your impact when possible (e.g., "Increased efficiency by 30%").
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
            Add Experience
          </button>
          <button
            type="button"
            onClick={deleteFieldHanlder}
            disabled={experienceFields.length === 0}
            className={`flex items-center gap-2 px-5 py-2.5 font-semibold rounded-lg transition shadow-lg ${experienceFields.length === 0
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
        {experienceFields.length === 0 && (
          <div className='text-center py-12 mb-6'>
            <div className='text-6xl mb-4'>💼</div>
            <h3 className='text-xl font-semibold text-gray-300 mb-2'>No Experience Added Yet</h3>
            <p className='text-gray-400 text-sm mb-6'>
              Click "Add Experience" to showcase your professional journey
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          {experienceFields.map((field, index) => {
            return (
              <div
                key={field.id}
                className='bg-gray-700/50 border border-gray-600 rounded-xl p-6 space-y-5 relative'
              >
                {/* Experience Badge */}
                <div className='absolute -top-3 left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full'>
                  Experience #{index + 1}
                </div>

                {/* Organization Name */}
                <div className='space-y-2'>
                  <label
                    htmlFor={`experiences.${index}.organization`}
                    className='block text-sm font-medium text-gray-300'
                  >
                    Organization Name <span className='text-red-400'>*</span>
                  </label>
                  <input
                    type="text"
                    className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                    placeholder='e.g., Google, Microsoft, Startup Inc.'
                    {...register(`experiences.${index}.organization`, { required: "Organization name is required" })}
                  />
                  {errors.experiences?.[index]?.organization && (
                    <span className='text-red-400 text-sm flex items-center gap-1'>
                      <span>⚠</span> {errors.experiences[index]?.organization?.message}
                    </span>
                  )}
                </div>

                {/* Role */}
                <div className='space-y-2'>
                  <label
                    htmlFor={`experiences.${index}.role`}
                    className='block text-sm font-medium text-gray-300'
                  >
                    Role / Position <span className='text-red-400'>*</span>
                  </label>
                  <input
                    type="text"
                    className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                    placeholder='e.g., Software Engineer Intern, ML Researcher'
                    {...register(`experiences.${index}.role`, { required: "Role is required" })}
                  />
                  {errors.experiences?.[index]?.role && (
                    <span className='text-red-400 text-sm flex items-center gap-1'>
                      <span>⚠</span> {errors.experiences[index]?.role?.message}
                    </span>
                  )}
                </div>

                {/* Duration and Units in Grid */}
                <div className='grid grid-cols-3 gap-4'>
                  <div className='col-span-2 space-y-2'>
                    <label
                      htmlFor={`experiences.${index}.duration`}
                      className='block text-sm font-medium text-gray-300'
                    >
                      Duration <span className='text-red-400'>*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                      placeholder='e.g., 6'
                      {...register(`experiences.${index}.duration`, {
                        required: "Duration is required",
                        min: { value: 1, message: "Duration must be greater than 0" }
                      })}
                    />
                    {errors.experiences?.[index]?.duration && (
                      <span className='text-red-400 text-sm flex items-center gap-1'>
                        <span>⚠</span> {errors.experiences[index]?.duration?.message}
                      </span>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor={`experiences.${index}.units`}
                      className='block text-sm font-medium text-gray-300'
                    >
                      Unit <span className='text-red-400'>*</span>
                    </label>
                    <select
                      className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer'
                      {...register(`experiences.${index}.units`, { required: "Unit is required" })}
                    >
                      <option value="days">Days</option>
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                    {errors.experiences?.[index]?.units && (
                      <span className='text-red-400 text-sm flex items-center gap-1'>
                        <span>⚠</span> {errors.experiences[index]?.units?.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className='space-y-2'>
                  <label
                    htmlFor={`experiences.${index}.description`}
                    className='block text-sm font-medium text-gray-300'
                  >
                    Responsibilities & Achievements <span className='text-red-400'>*</span>
                  </label>
                  <textarea
                    rows={5}
                    className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none'
                    placeholder='• Developed and deployed 5+ features using React and Node.js&#10;• Collaborated with cross-functional teams to improve user experience&#10;• Reduced page load time by 40% through optimization'
                    {...register(`experiences.${index}.description`, { required: "Description is required" })}
                  />
                  {errors.experiences?.[index]?.description && (
                    <span className='text-red-400 text-sm flex items-center gap-1'>
                      <span>⚠</span> {errors.experiences[index]?.description?.message}
                    </span>
                  )}
                  <p className='text-xs text-gray-400 flex items-center gap-1'>
                    💡 Use bullet points (•) to list achievements. Start each with an action verb.
                  </p>
                </div>
              </div>
            )
          })}

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            {/* Save Button - Only show when there are entries */}
            {experienceFields.length > 0 && (
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
                    Save Experience
                  </span>
                )}
              </button>
            )}

            {/* Continue Button - Always visible */}
            {experienceFields.length > 0 ?
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
            Example Experience Entry
          </h3>
          <div className='bg-gray-700/50 border border-gray-600 rounded-lg p-4'>
            <div className='flex justify-between items-start mb-2'>
              <div>
                <p className='text-blue-400 font-semibold'>Google</p>
                <p className='text-gray-300 text-sm'>Software Engineering Intern</p>
              </div>
              <span className='text-gray-400 text-xs bg-gray-600 px-2 py-1 rounded'>6 Months</span>
            </div>
            <div className='text-gray-300 text-sm space-y-1'>
              <p>• Developed and deployed 3 new features for Google Search using React and TypeScript</p>
              <p>• Collaborated with 5+ engineers to optimize backend services, reducing latency by 25%</p>
              <p>• Wrote comprehensive unit tests achieving 95% code coverage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceForm;