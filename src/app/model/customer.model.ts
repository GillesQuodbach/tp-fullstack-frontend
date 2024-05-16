export class Customer {
    id : number;
    name : string;
    lastname : string;
    adress : string;
    phone : string;
    email : string;

    constructor(id : number, name : string, lastname : string, adress : string, phone : string, email:string){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.adress = adress;
        this.phone = phone;
        this.email = email;
    }
}