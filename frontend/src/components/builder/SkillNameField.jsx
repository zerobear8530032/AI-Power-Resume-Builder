import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

function SkillNameField({ control, index, register, errors }) {
    const { fields: skillNamesFields, append, remove } = useFieldArray({
        control: control,
        name: `skills.${index}.skillNames`
    });
    useEffect(() => {
        if(skillNamesFields.length==0){
            addSkillNameHandler();
        }
    }, [])
    const addSkillNameHandler = () => {

        append("");
    }
    const deleteSkillNameHandler = () => {
        if (skillNamesFields.length != 0) {
            remove(skillNamesFields.length - 1);
        }
    }
    return (
        <div>
            <div className="flex gap-5 justify-center mb-5 ">
                <p className="block text-md font-medium text-gray-300 ">Add Field </p>
                <span className="flex justify-center items-center" onClick={addSkillNameHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                </span>
                <span className="flex justify-center items-center" onClick={deleteSkillNameHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                </span>
            </div>
            {
                skillNamesFields.map((f, idx) => {
                    return (
                        <div className='space-y-5 mb-5' key={f.id} >
                            <label
                                htmlFor={`skills.${index}.skillNames.${idx}`}
                                className='block text-sm font-medium text-gray-300'
                            >
                                Skills <span className='text-red-400'>*</span>
                            </label>
                            <input
                                type="text"
                                className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                                placeholder=' Python / JavaScript/ React/ Node.js'
                                {...register(`skills.${index}.skillNames.${idx}`, { required: "Please enter the skill names" })}
                            />
                            {errors.skills?.[index]?.skillNames?.[idx] && (
                                <span className='text-red-400 text-sm flex items-center gap-1'>
                                    <span>⚠</span> {errors.skills[index].skillNames[idx].message}
                                </span>
                            )}

                            <p className='text-xs text-gray-400 flex items-center gap-1'>
                                💡 Add Field + to add more  skills 
                            </p>
                        </div>)
                })
            }
        </div>)
}

export default SkillNameField;