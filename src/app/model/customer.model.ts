export class Customer {
    name : string;
    lastname : string;
    adress : string;
    phone : string;
    email : string;

    constructor(name : string, lastname : string, adress : string,phone : string, email:string){
        this.name = name;
        this.lastname = lastname;
        this.adress = adress;
        this.phone = phone;
        this.email = email;
    }
}