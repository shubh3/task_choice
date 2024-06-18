import { Button, Card, Steps } from '@/components/ui'
import React, { Suspense, lazy, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { updateStep, useAppDispatch } from '../store';
import useAnimation from '@/utils/hooks/useAnimation';
import Footer from '@/components/template/Footer';
import { StickyFooter } from '@/components/shared';
import FormSubmit from '../components/FormSubmit';

function FormProcess() {

  const dispatch = useAppDispatch();
  const step: number = useSelector((s: any) => s?.candiatureForm?.data?.step);
  const animateDescriptionState = useAnimation([step]);

  const onPrevious = () => {

    dispatch(updateStep(step - 1));

  }

  const onNext = () => {
    dispatch(updateStep(step + 1));
  }

  const componentMapping: any = {
    0: lazy(() => import('../components/PersonalInformation')),
    1: lazy(() => import('../components/EducationalInformation')),
    2: lazy(() => import('../components/WorkExperience')),
    3: lazy(() => import('../components/SkillsAndQualification')),
    4: lazy(() => import('../components/AdditionalInformation')),
    5: lazy(() => import('../components/Review')),
    6: lazy(() => import('../components/FormSubmit'))
  }

  const LazyDefault = lazy(() => import('@/components/common/LazyDefault'))

  const LazyComponent = useMemo(() => {
    if (componentMapping[step])
      return componentMapping[step]
    else
      return LazyDefault
  }, [step])


  return (
    <div>
      <div className=''>
        <div className='my-2'>
          <Steps current={step}>
            <Steps.Item title="Personal Information" />
            <Steps.Item title="Education" />
            <Steps.Item title="Work Experience" />
            <Steps.Item title="Skills and Qualifications" />
            <Steps.Item title="Additional Information" />
            <Steps.Item title="Review" />
          </Steps>
        </div>

        <Suspense fallback={<div className='min-h-[40vh]'></div>}>
          <div className={`${animateDescriptionState ? 'fadeAnimation' : ''} p-4 my-4 max-h-[70vh] overflow-y-auto`}>
            <Card className=''>
              <LazyComponent />
            </Card>
          </div>
        </Suspense>

        
      </div>


    </div>
  )
}

export default FormProcess
