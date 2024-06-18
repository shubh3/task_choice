import React from 'react'
import PersonalInformation from '../PersonalInformation'
import EducationalDetails from '../EducationalInformation'
import JobExperience from '../WorkExperience'
import Certifications from '../SkillsAndQualification'
import UploadForm from '../AdditionalInformation'
import { updateStep, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { StickyFooter } from '@/components/shared'
import { Button } from '@/components/ui'

function Review() {
  const dispatch = useAppDispatch();
  const step: number = useSelector((s: any) => s?.candiatureForm?.data?.step);

  const onSubmit = () => {
    dispatch(updateStep(step + 1));

  }
  return (
    <div>
      <h1 className='text-center mb-4'>Form Preview</h1>

      <h3 className='my-2'><u>Personal Infomation</u></h3>
      <PersonalInformation />
      <hr className='h-[2px] w-full mb-8' />

      <h3 className='my-2'><u>Education</u></h3>
      <EducationalDetails />
      <hr className='h-[2px] w-full mb-8' />

      <h3 className='my-2'><u>Work Experience</u></h3>
      <JobExperience />
      <hr className='h-[2px] w-full mb-8' />

      <h3 className='my-2'><u>Skills and Qualifications</u></h3>
      <Certifications />
      <hr className='h-[2px] w-full mb-8' />

      <h3 className='my-2'><u>Additional Information</u></h3>
      <UploadForm />
      <hr className='h-[2px] w-full mb-8' />

      <StickyFooter>
        <div className="mt-4 text-right p-4 flex justify-end ">
          <div className='w-fit p-4 bg-slate-100 rounded-lg rounded-lg '>

            <Button
              type='button'
              onClick={onSubmit}>
              {'Submit'}
            </Button>
          </div>

        </div>
      </StickyFooter>

    </div>
  )
}

export default Review
