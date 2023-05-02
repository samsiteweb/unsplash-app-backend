
import { celebrate, Joi, Segments } from 'celebrate';

export const addImageSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      imgUrl: Joi.string().required().trim(),
      label: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);

export const deleteImageSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      image_id: Joi.string().required().trim(),
      passwords: Joi.string().required().trim()
    })
  },
  {
    abortEarly: false
  }
);