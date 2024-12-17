import * as yup from 'yup';

export const postSchema = yup.object().shape({
    content: yup.string().required('content is required'),
    author: yup.string().required('content is required'),
    media: yup.string(),
  })