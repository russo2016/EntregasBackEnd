export default class UsersDTO{
    constructor(user){
        this.fullName = (user.first_name === undefined ? "Nombre no encontrado" : user.first_name) + " " + (user.last_name === undefined ? "Apellido no encontrado" : user.last_name);
        this.email = user.email;
        this.age = user.age;
        this.role = user.role;
        this.cart = user.cart._id === undefined ? user.cart : user.cart._id;
        this.githubId = user.githubId === undefined ? "No tiene" : user.githubId;
    }
}