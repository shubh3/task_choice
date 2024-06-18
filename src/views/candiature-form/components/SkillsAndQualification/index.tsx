import React, { useState } from 'react'
import { Field, Form, Formik, FieldArray } from 'formik'
import * as Yup from 'yup'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { MdDelete } from "react-icons/md"
import CreatableSelect from 'react-select/creatable'
import reducer, { updateSkillsData } from './store'
import { injectReducer, useAppDispatch } from '@/store'
import FormButtons from '../../common/FormButtons'
import { useSelector } from 'react-redux'
import { updateStep } from '../../store'

injectReducer('SkillsForm', reducer)

// Helper function to format date to yyyy-MM-dd
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

// Validation schema
const validationSchema = Yup.object().shape({
  certifications: Yup.array().of(
    Yup.object().shape({
      certName: Yup.string().required('Certification Name is required.'),
      issuingOrg: Yup.string().required('Issuing Organization is required.'),
      dateIssued: Yup.date().required('Date Issued is required.')
    })
  ),
  skills: Yup.array().min(1, 'At least one skill is required.').of(
    Yup.object().shape({
      value: Yup.string().required('Skill is required.'),
      label: Yup.string().required('Skill is required.')
    })
  )
})

const Certifications = () => {
  const initialSkillOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
  ]

  const [skillOptions, setSkillOptions] = useState(initialSkillOptions);
  const dispatch = useAppDispatch();
  const step = useSelector((s: any) => s?.candiatureForm?.data?.step);
  const formData = useSelector((s: any) => s?.SkillsForm?.data);

  // Ensure dates are in yyyy-MM-dd format
  const formattedFormData = {
    ...formData,
    certifications: formData.certifications.map(cert => ({
      ...cert,
      dateIssued: formatDate(cert.dateIssued)
    }))
  }

  return (
    <>
      <div>
        <Formik
          initialValues={formattedFormData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Ensure dates are formatted correctly before dispatching
            const formattedValues = {
              ...values,
              certifications: values.certifications.map(cert => ({
                ...cert,
                dateIssued: formatDate(cert.dateIssued)
              }))
            };
            dispatch(updateSkillsData(formattedValues));
            dispatch(updateStep(step + 1));
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <FormContainer>

                <div className='my-4'>
                  <FormItem
                    label="Skills"
                    invalid={errors.skills && touched.skills}
                    errorMessage={errors.skills && touched.skills ? 'At least one skill is required.' : ''}
                  >
                    <CreatableSelect
                      isMulti
                      placeholder="Select or create skills"
                      options={skillOptions}
                      value={values.skills}
                      onChange={(selected) => setFieldValue('skills', selected)}
                      onCreateOption={(inputValue) => {
                        const newSkill = { value: inputValue.toLowerCase(), label: inputValue }
                        setSkillOptions((prev) => [...prev, newSkill])
                        setFieldValue('skills', [...values.skills, newSkill])
                      }}
                    />
                  </FormItem>
                </div>

                <hr className='h-[2px] w-full px-2 mb-4'/>
                <h3 className='my-4'>Certifications</h3>
                <FieldArray name="certifications">
                  {({ insert, remove, push }) => (
                    <div>
                      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                        <thead>
                          <tr>
                            <th className='text-left px-2'>Certification Name</th>
                            <th className='text-left px-2'>Issuing Organization</th>
                            <th className='text-left px-2'>Date Issued</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {values.certifications.length > 0 &&
                            values.certifications.map((certification, index) => (
                              <tr key={index}>
                                <td className='p-2'>
                                  <FormItem
                                    invalid={errors.certifications?.[index]?.certName && touched.certifications?.[index]?.certName}
                                    errorMessage={errors.certifications?.[index]?.certName}
                                  >
                                    <Field
                                      type="text"
                                      name={`certifications.${index}.certName`}
                                      placeholder="Certification Name"
                                      component={Input}
                                    />
                                  </FormItem>
                                </td>
                                <td className='p-2'>
                                  <FormItem
                                    invalid={errors.certifications?.[index]?.issuingOrg && touched.certifications?.[index]?.issuingOrg}
                                    errorMessage={errors.certifications?.[index]?.issuingOrg}
                                  >
                                    <Field
                                      type="text"
                                      name={`certifications.${index}.issuingOrg`}
                                      placeholder="Issuing Organization"
                                      component={Input}
                                    />
                                  </FormItem>
                                </td>
                                <td className='p-2'>
                                  <FormItem
                                    invalid={errors.certifications?.[index]?.dateIssued && touched.certifications?.[index]?.dateIssued}
                                    errorMessage={errors.certifications?.[index]?.dateIssued}
                                  >
                                    <Field
                                      type="date"
                                      name={`certifications.${index}.dateIssued`}
                                      placeholder="Date Issued"
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
                        onClick={() => push({ certName: '', issuingOrg: '', dateIssued: '' })}
                      >
                        Add Certification
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
    </>
  )
}

export default Certifications
