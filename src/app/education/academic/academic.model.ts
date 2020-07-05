export interface IAcademic {
  id?: string;
  educationalInstitution?: string;
  formation?: string;
  fieldOfStudy?: string;
  startDate?: Date;
  endDate?: Date;
  grade?: string;
  activities?: string;
  description?: string;
}

export class Academic implements IAcademic {
  constructor(
    public id?: string,
    public educationalInstitution?: string,
    public formation?: string,
    public fieldOfStudy?: string,
    public startDate?: Date,
    public endDate?: Date,
    public grade?: string,
    public activities?: string,
    public description?: string
  ) {}
}
