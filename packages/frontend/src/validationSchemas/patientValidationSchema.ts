import * as yup from "yup"

export const patientFormFields = {
  email: yup.string()
    .email("Неверный формат Email")
    .required("Введите Email"),
  nickname: yup.string()
    .required("Введите псевдоним"),
  firstName: yup.string()
    .required("Введите имя"),
  lastName: yup.string()
    .required("Введите фамилию"),
  middleName: yup.string(),
  addressRegion: yup.string()
    .required("Введите регион"),
  addressSettlement: yup.string()
    .required("Введите город/поселение"),
  addressLocation: yup.string()
    .required("Введите адрес"),
  password: yup.string()
    .required("Введите пароль"),
}

export const patientValidationSchema = yup.object().shape(patientFormFields)