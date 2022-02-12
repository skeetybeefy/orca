import { IUser } from "types/interfaces/user"

const usersTestList: IUser[] = [
    {
        id: "user_0",
        email: "test@abc.com",
        firstName: "Artem",
        middleName: "Olegovich",
        lastName: "Pavlov",
        birthdate: new Date("1990-01-01"),
        address: "Saint-Petersburg"
    },
    {
        id: "user_1",
        email: "listlistlist@abc.com",
        firstName: "Nikita",
        middleName: "Olegovich",
        lastName: "Pavlov",
        birthdate: new Date("1992-03-09"),
        address: "Saint-Petersburg"
    },
    {
        id: "user_2",
        email: "qwerty1994@abc.com",
        firstName: "Elena",
        middleName: "Sergeevna",
        lastName: "Testova",
        birthdate: new Date("1994-01-28"),
        address: "Saint-Petersburg"
    }
]

export default usersTestList