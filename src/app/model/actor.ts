export class Actor {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
  
    constructor(
      id: number = 0,
      firstName: string = "",
      lastName: string = "",
      gender: string = "",
      birthDate: Date = new Date()
    ) {
      this.id = id;
      this.firstName =firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.birthDate = birthDate;
    }
  
    details(): string {
      return `Actor: id ${this.id}, ${this.lastName}, ${this.firstName}, gender: (${this.gender}), born on: ${this.birthDate}`;
    }
  }