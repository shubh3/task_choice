import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import './css/EducationalDetails.css'
import reducer, { updateEducationData } from './store'
import { injectReducer, useAppDispatch } from '@/store'
import FormButtons from '../../common/FormButtons'
import { useSelector } from 'react-redux'
import { updateStep } from '../../store'

injectReducer('EducationalInfo', reducer)

// Validation schema
const validationSchema = Yup.object().shape({
    ssc: Yup.object().shape({
        name: Yup.string().required('Required'),
        board: Yup.string().required('Required'),
        cgpa: Yup.number().min(0, 'Must be at least 0').max(10, 'Must be at most 10').required('Required'),
        year: Yup.number().min(1900, 'Invalid year').max(new Date().getFullYear(), 'Invalid year').required('Required'),
    }),
    hsc: Yup.object().shape({
        name: Yup.string().required('Required'),
        board: Yup.string().required('Required'),
        cgpa: Yup.number().min(0, 'Must be at least 0').max(10, 'Must be at most 10').required('Required'),
        year: Yup.number().min(1900, 'Invalid year').max(new Date().getFullYear(), 'Invalid year').required('Required'),
    }),
    graduation: Yup.object().shape({
        name: Yup.string().required('Required'),
        board: Yup.string().required('Required'),
        cgpa: Yup.number().min(0, 'Must be at least 0').max(10, 'Must be at most 10').required('Required'),
        year: Yup.number().min(1900, 'Invalid year').max(new Date().getFullYear(), 'Invalid year').required('Required'),
    }),
    postGraduation: Yup.object().shape({
        name: Yup.string().required('Required'),
        board: Yup.string().required('Required'),
        cgpa: Yup.number().min(0, 'Must be at least 0').max(10, 'Must be at most 10').required('Required'),
        year: Yup.number().min(1900, 'Invalid year').max(new Date().getFullYear(), 'Invalid year').required('Required'),
    }),
})

const educationMapping : any = {
  'ssc': 'SSC',
  'hsc' : 'HSC',
  'graduation' : 'Graduation.',
  'postGraduation': 'Post Graduation.'
}

const EducationalDetails = () => {
    const dispatch = useAppDispatch();
    const step: number = useSelector((s: any) => s?.candiatureForm?.data?.step);
    const formData: Object = useSelector((s: any) => s?.EducationalInfo?.data);
    return (
        <div>
            <Formik
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                   dispatch(updateEducationData(values));
                   dispatch(updateStep(step + 1));
                }}
            >
                {({ touched, errors, values }) => (
                    <Form>
                        <FormContainer>
                            <table className='w-full '>
                                <thead>
                                    <tr>
                                        <th>School/Institute Name</th>
                                        <th>Board/University</th>
                                        <th>CGPA</th>
                                        <th>Passing Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {['ssc', 'hsc', 'graduation', 'postGraduation'].map((level : string) => (
                                        <tr key={level} >
                                            <td className='px-4 py-2'>
                                                <FormItem
                                                    invalid={errors[level]?.name && touched[level]?.name}
                                                    errorMessage={errors[level]?.name}
                                                    
                                                >
                                                    <Field
                                                        type="text"
                                                        name={`${level}.name`}
                                                        placeholder="Name"
                                                        component={Input}
                                                        value={educationMapping[level]}
                                                        disabled
                                                    />
                                                </FormItem>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <FormItem
                                                    invalid={errors[level]?.board && touched[level]?.board}
                                                    errorMessage={errors[level]?.board}
                                                >
                                                    <Field
                                                        type="text"
                                                        name={`${level}.board`}
                                                        placeholder="Board/University"
                                                        component={Input}
                                                    />
                                                </FormItem>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <FormItem
                                                    invalid={errors[level]?.cgpa && touched[level]?.cgpa}
                                                    errorMessage={errors[level]?.cgpa}
                                                >
                                                    <Field
                                                        type="number"
                                                        name={`${level}.cgpa`}
                                                        placeholder="CGPA"
                                                        component={Input}
                                                    />
                                                </FormItem>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <FormItem
                                                    invalid={errors[level]?.year && touched[level]?.year}
                                                    errorMessage={errors[level]?.year}
                                                >
                                                    <Field
                                                        type="number"
                                                        name={`${level}.year`}
                                                        placeholder="Year"
                                                        component={Input}
                                                    />
                                                </FormItem>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <FormButtons />

                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default EducationalDetails
