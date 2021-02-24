import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup
    .string()
    .email("Please use a valid email.")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be atleast 8 characters."),
  acceptTerms: yup.boolean().oneOf([true], "Must accept terms of service."),
});

export default formSchema;
