import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Upload from '@/components/ui/Upload'
import type { FieldProps } from 'formik'
import reducer from './store'
import { injectReducer, useAppDispatch } from '@/store'
import FormButtons from '../../common/FormButtons'
import { useSelector } from 'react-redux'
import { updateStep } from '../../store'

injectReducer('AdditionalInfo', reducer)

// Validation schema
const validationSchema = Yup.object().shape({
    coverLetter: Yup.array().min(1, 'Cover letter is required!').required(),
    resume: Yup.array().min(1, 'Resume is required!').required(),
})

const UploadForm = () => {
    const dispatch = useAppDispatch();
    const step = useSelector((s: any) => s?.candiatureForm?.data?.step);

    const beforeUpload = (file: FileList | null, fileList: File[]) => {
        let valid: string | boolean = true

        const allowedFileType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        const MAX_FILE_SIZE = 2000000 // 2MB

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .pdf, .doc, or .docx file!'
                }

                if (f.size >= MAX_FILE_SIZE) {
                    valid = 'Upload file cannot be more than 2MB!'
                }
            }
        }

        return valid
    }

    return (
        <div>
            <Formik
                initialValues={{ coverLetter: [], resume: [] }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(updateStep(step + 1));

                }}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                asterisk
                                label="Cover Letter"
                                invalid={errors.coverLetter && touched.coverLetter}
                                errorMessage={errors.coverLetter}
                            >
                                <Field name="coverLetter">
                                    {({ field, form }: FieldProps) => (
                                        <Upload
                                            beforeUpload={beforeUpload}
                                            fileList={values.coverLetter}
                                            onChange={(files) => form.setFieldValue(field.name, files)}
                                            onFileRemove={(files) => form.setFieldValue(field.name, files)}
                                            draggable
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                asterisk
                                label="Resume"
                                invalid={errors.resume && touched.resume}
                                errorMessage={errors.resume}
                            >
                                <Field name="resume">
                                    {({ field, form }: FieldProps) => (
                                        <Upload
                                            beforeUpload={beforeUpload}
                                            fileList={values.resume}
                                            onChange={(files) => form.setFieldValue(field.name, files)}
                                            onFileRemove={(files) => form.setFieldValue(field.name, files)}
                                            draggable
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormButtons />
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default UploadForm
