import * as yup from "yup";

export const postSchema = yup.object().shape({
  content: yup.string().required("content is required"),
  author: yup.string().required("content is required"),
  media: yup.string(),
});

export const commentSchema = yup.object().shape({
  content: yup
    .string()
    .required("type something to comtinue")
    .max(100, "text can be more than 100 letters"),
  post: yup.string(),
  author: yup.string(),
});

export const repostSchema = yup.object().shape({
  content: yup
    .string()
    .required("type something to comtinue")
    .max(100, "text can be more than 100 letters"),
  reposts: yup.string(),
  user: yup.string(),
});
