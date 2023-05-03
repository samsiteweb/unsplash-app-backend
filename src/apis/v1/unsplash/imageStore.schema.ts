
import { celebrate, Joi, Segments } from 'celebrate';

export const fetchImageSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      perPage: Joi.number()
    })
  },
  {
    abortEarly: false
  }
);

export const addImageSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      image_url: Joi.string().required().trim(),
      label: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);



export const searchImageSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      queryString: Joi.string().required().trim().allow('')
    })
  },
  {
    abortEarly: false
  }
);

export const deleteImageSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().required().trim()
    }),
    [Segments.QUERY]: Joi.object().keys({
      id: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);