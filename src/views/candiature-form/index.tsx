import React from 'react'
import { BACKGROUNDIMAGE } from '@/constants/theme.constant'
import { Card } from '@/components/ui'
import FormProcess from './form'
import reducer from './store'
import { injectReducer } from '@/store'

injectReducer('candiatureForm', reducer)

function CandiatureForm() {
    return (
        <div className='p-8 h-full bg-cover bg-center overflow-y-auto max-h-[100vh]'
        style={{
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 59%, rgba(0,212,255,1) 100%)'           
          }}
        >
            <Card className='shadow-2xl '>
                <div className='flex flex-col gap-4'>
                <div className=' text-center flex gap-4 flex-col'>
                    <h1 className='font-sans'>Candidate Information Form</h1>
                    <p className='font-mono'>Our step-by-step job application form is designed to gather thorough information about your professional background, skills, and experiences. Each section is crucial for evaluating your candidacy accurately. Please proceed through each step diligently to provide a complete application.</p>
                </div>

                <FormProcess />
                </div>
                
            </Card>
        </div>
    )
}

export default CandiatureForm
