import * as Yup from 'Yup'

const registerSchema = Yup.object().shape({
    name: Yup.string('Name must be a string').min(3, 'the name must be at least 3 characters long').max(20, 'the name length must be a maximum of 20 characters').required('this field is required'),
    email: Yup.string().email('email is nit valid').required('this field is required'),
    comment: Yup.string().min(3, 'the comment must be at least 3 characters long').required('this field is required'),
})

export default registerSchema