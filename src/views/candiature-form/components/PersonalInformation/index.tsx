import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import reducer, { updateData } from './store'
import { injectReducer, useAppDispatch } from '@/store'
import { useEffect } from 'react'
import FormButtons from '../../common/FormButtons'
import { updateStep } from '../../store'
import { useSelector } from 'react-redux'

injectReducer('PersonalInfo', reducer)

// Validation schema
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name is too short! Minimum 2 characters required.')
        .max(50, 'Name is too long! Maximum 50 characters allowed.')
        .required('Name is required.'),
    email: Yup.string()
        .email('Invalid email format.')
        .required('Email is required.'),
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must be only digits.')
        .min(10, 'Phone number must be exactly 10 digits.')
        .max(10, 'Phone number must be exactly 10 digits.')
        .required('Phone number is required.'),
    address: Yup.string()
        .min(5, 'Address is too short! Minimum 5 characters required.')
        .max(100, 'Address is too long! Maximum 100 characters allowed.')
        .required('Address is required.')
});



const PersonalInformation = () => {
    const dispatch = useAppDispatch();
    const step: number = useSelector((s: any) => s?.candiatureForm?.data?.step);
    const formData: Object = useSelector((s: any) => s?.PersonalInfo?.data);

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(updateData(values));
                    dispatch(updateStep(step + 1));

                }}
            >
                {({ touched, errors, values }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Name"
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                                asterisk
                            >
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Email"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                                asterisk
                            >
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Phone"
                                invalid={errors.phone && touched.phone}
                                errorMessage={errors.phone}
                                asterisk
                            >
                                <Field
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Address"
                                invalid={errors.address && touched.address}
                                errorMessage={errors.address}
                                asterisk
                            >
                                <Field
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    component={Input}
                                />
                            </FormItem>
                            <FormButtons errors={errors} values={values}/>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default PersonalInformation
