import { required, confirmed, length, email, min, max } from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'

extend('required', {
  ...required,
  message: 'Обязательное поле'
})

extend('email', {
  ...email,
  message: 'Введите валидный E-mail'
})

extend('confirmed', {
  ...confirmed,
  message: ''
})

extend('phone', {
  ...min,
  message: 'Введите корректный номер телефона'
})

extend('max', {
  ...max,
  message: 'Недопустимое количество символов'
})

extend('min', {
  ...min,
  message: 'Недопустимое количество символов'
})

extend('length', {
  ...length,
  message: ''
})
