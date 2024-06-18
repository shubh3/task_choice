import React from 'react'
import { Field, Form, Formik, FieldArray } from 'formik'
import * as Yup from 'yup'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import reducer, { updateWorkData } from './store'
import { injectReducer, useAppDispatch } from '@/store'
import FormButtons from '../../common/FormButtons'
import { updateStep } from '../../store'
import { useSelector } from 'react-redux'

injectReducer('WorkExperienceForm', reducer)

const validationSchema = Yup.object().shape({
    experiences: Yup.array().of(
        Yup.object().shape({
            companyName: Yup.string().required('Company Name is required.'),
            jobTitle: Yup.string().required('Job Title is required.'),
            duration: Yup.string().required('Duration is required.')
        })
    )
})

const JobExperience = () => {
    const dispatch = useAppDispatch();
    const step: number = useSelector((s: any) => s?.candiatureForm?.data?.step);
    const formData: Object = useSelector((s: any) => s?.WorkExperienceForm?.data );
    console.log(formData);
    return (
        <div className='w-full'>
            <Formik
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(updateWorkData(values?.experiences));
                    dispatch(updateStep(step + 1));
                }}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <FormContainer>
                            <FieldArray name="experiences">
                                {({ insert, remove, push }) => (
                                    <div className='w-full'>
                                        <table className="w-full">
                                            <thead>
                                                <tr>
                                                    <th className='text-left px-2'>Company Name</th>
                                                    <th className='text-left px-2'>Job Title</th>
                                                    <th className='text-left px-2'>Duration</th>
                                                    <th >Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {values?.experiences?.length > 0 &&
                                                    values?.experiences?.map((experience, index) => (
                                                        <tr key={index}>
                                                            <td className='px-2 py-2'>
                                                                <FormItem
                                                                    invalid={errors.experiences?.[index]?.companyName && touched.experiences?.[index]?.companyName}
                                                                    errorMessage={errors.experiences?.[index]?.companyName}
                                                                >
                                                                    <Field
                                                                        type="text"
                                                                        name={`experiences.${index}.companyName`}
                                                                        placeholder="Company Name"
                                                                        component={Input}
                                                                    />
                                                                </FormItem>
                                                            </td>
                                                            <td className='px-2 py-2'>
                                                                <FormItem
                                                                    invalid={errors.experiences?.[index]?.jobTitle && touched.experiences?.[index]?.jobTitle}
                                                                    errorMessage={errors.experiences?.[index]?.jobTitle}
                                                                >
                                                                    <Field
                                                                        type="text"
                                                                        name={`experiences.${index}.jobTitle`}
                                                                        placeholder="Job Title"
                                                                        component={Input}
                                                                    />
                                                                </FormItem>
                                                            </td>
                                                            <td className='px-2 py-2'>
                                                                <FormItem
                                                                    invalid={errors.experiences?.[index]?.duration && touched.experiences?.[index]?.duration}
                                                                    errorMessage={errors.experiences?.[index]?.duration}
                                                                >
                                                                    <Field
                                                                        type="text"
                                                                        name={`experiences.${index}.duration`}
                                                                        placeholder="Duration"
                                                                        component={Input}
                                                                    />
                                                                </FormItem>
                                                            </td>
                                                            <td className='flex items-start py-2 justify-center'>
                                                                <Button
                                                                    type="button"
                                                                    className='!m-0'
                                                                    shape="circle"
                                                                    onClick={() => remove(index)}
                                                                    icon={<MdDelete />}
                                                                >

                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                        <Button
                                            type="button"
                                            onClick={() => push({ companyName: '', jobTitle: '', duration: '' })}
                                            icon={<IoMdAddCircleOutline />}
                                        >
                                            Add Experience
                                        </Button>
                                    </div>
                                )}
                            </FieldArray>
                            <FormButtons />

                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default JobExperience
