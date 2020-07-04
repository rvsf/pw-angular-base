export interface ITeacher {
  id?: string;
  name?: string;
  bday?: string;
  email?: string;
  bio?: string;
  resume?: string;
  formationYear?: string;
  workingYear?: string
  gender?: string
}

export class Teacher implements ITeacher {
  constructor(
    public id?: string,
    public name?: string,
    public bday?: string,
    public email?: string,
    public bio?: string,
    public resume?: string,
    public formationYear?: string,
    public workingYear?: string,
    public gender?: string
  ) {}
}
