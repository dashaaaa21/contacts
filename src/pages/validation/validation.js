import * as Yup from 'yup';

export const contactValidationSchema = Yup.object().shape({
    firstName: Yup.string().min(2,'Too Short!').max(50,'Too Long!').required('Required'),
    lastName: Yup.string().min(2,'Too Short!').max(50,'Too Long!').required('Required'),
    phone: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    avatar: Yup.string(),
    gender: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    favorite: Yup.boolean()
});
