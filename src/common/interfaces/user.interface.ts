export interface IUser extends Document{
    _id: any;
    nombre:string;
    apellido:string;
    email:string;
    password:string;
}