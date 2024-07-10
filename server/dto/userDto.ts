enum UserRole{
    USER = 'user',
    ADMIN = 'admin'
};

class CreateUserDto {
    firstname: string;
    lastname: string;
    mail: string;
    password: string;
    rules: boolean;
    isNewsletter: boolean;
    accessToken: string;
    pic: string;
    role: UserRole;

    constructor(
        firstname: string,
        lastname: string,
        mail: string,
        password: string,
        rules: boolean,
        isNewsletter: boolean,
        accessToken: string,
        pic: string,
        role: UserRole
    ){
        this.firstname = firstname;
        this.lastname = lastname;
        this.mail = mail;
        this.password = password;
        this.rules = rules;
        this.isNewsletter = isNewsletter;
        this.accessToken = accessToken;
        this.pic = pic;
        this.role = role;
    }
}

export {UserRole, CreateUserDto};