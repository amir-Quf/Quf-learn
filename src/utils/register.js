import * as Yup from 'Yup'

const registerSchemaComment = Yup.object().shape({
    name: Yup.string('Name must be a string').min(3, 'the name must be at least 3 characters long').max(20, 'the name length must be a maximum of 20 characters').required('this field is required'),
    email: Yup.string().email('email is nit valid').required('this field is required'),
    comment: Yup.string().min(3, 'the comment must be at least 3 characters long').required('this field is required'),
})


const registerSchemaUser = Yup.object().shape({
    username: Yup.string('Name must be a string').min(3, 'the name must be at least 3 characters long').max(20, 'the name length must be a maximum of 20 characters').required('this field is required'),
    email: Yup.string().email('email is nit valid').required('this field is required'),
    password: Yup.string().min(5,'the password must be at least 5 characters long').max(21, 'the name length must be a maximum of 21 characters').required('this field is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'the password is not the same as its repetition').required('this field is required'),
})

const registerSchemaLogin = Yup.object().shape({
    username: Yup.string('Name must be a string').min(3, 'the name must be at least 3 characters long').required('this field is required'),
    password: Yup.string().min(5,'the password must be at least 5 characters long').max(21, 'the name length must be a maximum of 21 characters').required('this field is required'),
})

const registerSchemaForgotPassword = Yup.object().shape({
    email: Yup.string().email('email is nit valid').required('this field is required')
})

const registerSchemaReDataUser = Yup.object().shape({
    username: Yup.string('Name must be a string').min(3, 'the name must be at least 3 characters long').max(20, 'the name length must be a maximum of 20 characters').required('this field is required'),
    password: Yup.string().min(5,'the password must be at least 5 characters long').max(21, 'the name length must be a maximum of 21 characters').required('this field is required'),
    email: Yup.string().email('email is nit valid').required('this field is required'),
})

export {registerSchemaUser, registerSchemaComment, registerSchemaLogin, registerSchemaForgotPassword, registerSchemaReDataUser}