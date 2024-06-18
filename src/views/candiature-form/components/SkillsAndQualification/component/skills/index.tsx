import React, { useState } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

// Initial skills options
const initialSkillOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
]

const SkillSelection = () => {
    const [skillOptions, setSkillOptions] = useState(initialSkillOptions)
    const [selectedSkills, setSelectedSkills] = useState([])

    const handleCreate = (inputValue) => {
        const newSkill = { value: inputValue.toLowerCase(), label: inputValue }
        setSkillOptions((prev) => [...prev, newSkill])
        setSelectedSkills((prev) => [...prev, newSkill])
    }

    const handleChange = (selected) => {
        setSelectedSkills(selected || [])
    }

    return (
        <div>
            <CreatableSelect
                isMulti
                placeholder="Select or create skills"
                options={skillOptions}
                value={selectedSkills}
                onChange={handleChange}
                onCreateOption={handleCreate}
            />
        </div>
    )
}

export default SkillSelection
