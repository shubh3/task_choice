import { StickyFooter } from '@/components/shared'
import { Button } from '@/components/ui'
import { useAppDispatch } from '@/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { updateStep } from '../store';
import ConditionalRenderer from '@/components/shared/ConditionalRenderer';
import useResponsive from '@/utils/hooks/useResponsive';


function FormButtons(props: any) {
    const dispatch = useAppDispatch();
    const step: number = useSelector((s: any) => s?.candiatureForm?.data?.step);

    const onPrevious = () => {

        dispatch(updateStep(step - 1));

    }

    const { smaller } = useResponsive();

    return (
        <>
            <ConditionalRenderer condition={() => smaller.md}>
                <div className="mt-4 text-right p-4 flex justify-end ">
                    <ConditionalRenderer condition={() => step != 5}>
                        <div className='w-fit p-4 lg:bg-slate-100 rounded-lg rounded-lg flex lg:flex-row flex-col gap-2'>

                            <Button
                                type='button'
                                className="mx-2"
                                disabled={step === 0}
                                onClick={onPrevious}
                            >
                                Previous
                            </Button>
                            <Button
                                type='submit'
                                disabled={step === 6} variant="solid" >
                                {step === 5 ? 'Submit' : 'Next'}
                            </Button>
                        </div>
                    </ConditionalRenderer>
                </div>
            </ConditionalRenderer>

            <ConditionalRenderer condition={() => !smaller.md}>

                <StickyFooter>
                    <div className="mt-4 text-right p-4 flex justify-end ">
                        <ConditionalRenderer condition={() => step != 5}>
                            <div className='w-fit p-4 lg:bg-slate-100 rounded-lg rounded-lg flex lg:flex-row flex-col gap-2'>

                                <Button
                                    type='button'
                                    className="mx-2"
                                    disabled={step === 0}
                                    onClick={onPrevious}
                                >
                                    Previous
                                </Button>
                                <Button
                                    type='submit'
                                    disabled={step === 6} variant="solid" >
                                    {step === 5 ? 'Submit' : 'Next'}
                                </Button>
                            </div>
                        </ConditionalRenderer>
                    </div>
                </StickyFooter>
            </ConditionalRenderer>

        </>
    )
}

export default FormButtons
