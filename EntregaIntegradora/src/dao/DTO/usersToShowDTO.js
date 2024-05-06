export default class UsersToShowDTO{
    constructor(user){
        this.fullName = (user.first_name === undefined ? "Nombre no encontrado" : user.first_name) + " " + (user.last_name === undefined ? "Apellido no encontrado" : user.last_name);
        this.email = user.email;
        this.role = user.role;
    }
}