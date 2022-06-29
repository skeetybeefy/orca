import * as yup from "yup"

import { patientFormFields } from "./patientValidationSchema"

export const doctorValidationSchema = yup.object().shape({
  ...patientFormFields,
  diplomaNumberNumericPart: yup.string()
    .matches(/^[0-9]*$/, "В поле ввода должны быть только цифры")
    .length(6, "Длина числовой части должна быть равна 6 символам")
    .required("Введите номер диплома (числовую часть)"),
  diplomaNumberLetterPart: yup.string()
    .matches(/^[a-zA-Z]*$/, "В поле ввода должны быть только буквы латинского алфавита")
    .length(2, "Длина буквенной части должна быть равна 2 символам")
    .required("Введите номер диплома (буквенную часть)"),
  qualification: yup.string()
    .required("Введите квалификацию"),
  specification: yup.string()
    .required("Введите специализацию"),
  medicalFacility: yup.string()
    .required("Введите медицинское учреждение"),
})
