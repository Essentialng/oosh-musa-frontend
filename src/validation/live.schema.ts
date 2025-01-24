import * as yup from 'yup'



export const eventValidationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    author: yup.string().required(),
    media: yup.string(),
    startDate: yup.string().required('Start date is required'),
    startTime: yup.string().required('Start date is required'),
    endDate: yup.string().required('Start date is required'),
    endTime: yup.string().required('Start date is required')
})