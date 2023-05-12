import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import authService from '../../services/auth';



const registerSchema = yup.object({
  email: yup
    .string()
    .email("Enter valid email")
    .required("Email must be entered"),
  password: yup
    .string()
    .min(8, "Password must have minimum 8 characters")
    .max(30, "Password must have maximum 30 characters")
    .required("Password is required"),
  username: yup 
    .string()
    .required("Username must be entered")

});

const RegisterForm = ({ styles }) => {
  const formic = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: ""
    },
    onSubmit: async (values, {resetForm}) => {
      try {
        const response = await authService.register(values);
        console.log(response);
      } catch (error) {
        console.log(error);
      }

      /* 
        authService.register(values)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      */
      resetForm();
    },
    validationSchema: registerSchema,
  });

  return (
    <form className={styles.form} onSubmit={formic.handleSubmit}>
      <h2 className={styles.title}>Register</h2>
      <div className={styles.control}>
        <TextField
          error={formic.touched.email && Boolean(formic.errors.email)}
          helperText={formic.touched.email && formic.errors.email}
          onBlur={formic.handleBlur}
          label="Email"
          variant="outlined"
          name="email"
          value={formic.values.email}
          onChange={formic.handleChange}
        />
      </div>
      <div className={styles.control}>
        <TextField
          error={formic.touched.username && Boolean(formic.errors.username)}
          helperText={formic.touched.username && formic.errors.username}
          onBlur={formic.handleBlur}
          label="Username"
          variant="outlined"
          name="username"
          value={formic.values.username}
          onChange={formic.handleChange}
        />
      </div>
      <div className={styles.control}>
        <TextField
          error={formic.touched.password && Boolean(formic.errors.password)}
          helperText={formic.touched.email && formic.errors.password}
          onBlur={formic.handleBlur}
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          value={formic.values.password}
          onChange={formic.handleChange}
        />
      </div>
      <input type="submit" value="Register" className={styles.submit} />
    </form>
  );
};

export default RegisterForm;
