export interface UserInterface {
    name: string,
    surname: string,
    patronymic: string,
    dateBirthday: any,
    bornplace: string,
    email: string,
    phone: string,
    datereg: string | Date,
    lastvisit: string | Date,
    key?: string
}

export const defaultUser: UserInterface = {
    name: '',
    surname: '',
    patronymic: '',
    dateBirthday: null,
    bornplace: '',
    email: '',
    phone: '',
    datereg: '',
    lastvisit: ''
}
