import * as yup from 'yup';
import Global from '../Ressources/Globals';

export const Schemasignup = yup.object().shape({
  phone: yup.string().min(8, Global.STRINGS.small_phone),
  code: yup.string().min(5, Global.STRINGS.small_code),
  username: yup.string().min(6, Global.STRINGS.small_username),
  language: yup.string(),
});

export const Schemasignin = yup.object().shape({
  phone: yup.string().min(8, Global.STRINGS.small_phone),
  code: yup.string().min(5, Global.STRINGS.small_code),
  language: yup.string(),
});
