import React, { useId } from 'react'
import s from './ContactForm.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"


const ContactForm = ({btnName, handleSubmit, children, initialValues ={
    name: '',
    number: '',
  } }) => {
 

  const nameFieldId = useId();
  const numberFieldId = useId();

  const onlyLetters = /^[A-Za-zA-Яа-яЄєІіЇїҐґ-\s]+$/;
  const validFormatOfTel = /^\d{3}-\d{2}-\d{2}$/;
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!').min(3, 'Too Short!').max(50, 'Too Long!').matches(onlyLetters, 'The name must contain only letters!'), 
    number: Yup.string().matches(validFormatOfTel, 'The number must be in the format XXX-XX-XX!').required('Phone number is required!')});
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
      <Form className={s.form}>
        {children}
        <div className={s.fieldWrapper}>
        <label htmlFor={nameFieldId}>Name</label>
          <Field id={nameFieldId} name='name' type='text' className={s.input} />
          <ErrorMessage name='name' component='p' className={s.error}/>
        <label htmlFor={numberFieldId}>Number</label>
          <Field id={numberFieldId} name='number' type='tel' className={s.input} />
          <ErrorMessage name='number' component='p' className={s.error}/>
          </div>
        <button type='submit' className={s.btnSub}>{btnName}</button>
      </Form>
    </Formik>
  )
}

export default ContactForm