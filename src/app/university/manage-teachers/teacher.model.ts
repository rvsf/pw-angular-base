export interface ITeacher {
  id?: string;
  name?: string;
  bday?: Date;
  email?: string;
  bio?: string;
  resume?: string;
  formationYear?: Date;
  workingYear?: Number
  gender?: string
}

export class Teacher implements ITeacher {
  constructor(
    public id?: string,
    public name?: string,
    public bday?: Date,
    public email?: string,
    public bio?: string,
    public resume?: string,
    public formationYear?: Date,
    public workingYear?: Number,
    public gender?: string
  ) {}
}
