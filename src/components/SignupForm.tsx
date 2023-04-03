import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import './signup.css';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const SignupForm: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required')
        .min(4, 'Name must be at least 4 characters'),
      email: Yup.string()
        .required('Email is required')
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Invalid email'),
      password: Yup.string().matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
        'Password must be 7-19 characters and contain at least one letter, one number and a special character',
      ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password')],
        'Password not match',
      ),
      phone: Yup.string()
        .required('Phone number is required')
        .matches(
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          'Invalid phone number',
        ),
    }),
    onSubmit: (values: FormValues) => {
      console.log(values);
    },
  });

  return (
    <section>
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && (
          <p className="error-msg">{formik.errors.name}</p>
        )}

        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && (
          <p className="error-msg">{formik.errors.email}</p>
        )}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && (
          <p className="error-msg">{formik.errors.password}</p>
        )}

        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        {formik.errors.confirmPassword && (
          <p className="error-msg">{formik.errors.confirmPassword}</p>
        )}

        <label htmlFor="phone">Phone number</label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Enter your phone number"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        {formik.errors.phone && (
          <p className="error-msg">{formik.errors.phone}</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default SignupForm;
