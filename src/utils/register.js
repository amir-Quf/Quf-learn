import * as Yup from 'Yup'

const registerSchema = Yup.object().shape({
    name: Yup.string().min(3).max(20).required(),
    email: Yup.string().email().required(),
    comment: Yup.string().min(3).required(),
})

export default registerSchema