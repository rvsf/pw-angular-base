import { Theme } from '../manage-themes/theme.model';
import { Teacher, ITeacher } from '../manage-teachers/teacher.model';

export interface ICourse {
  id?: string;
  title?: string;
  description?: string;
  ect?: number;
  maxHours?: number;
  practice?: boolean;
  teacher?:ITeacher
  themes?:Theme[]

}

export class Course implements ICourse {
  constructor(
    public id?: string,
    public title?: string,
    public description?: string,
    public ect?: number,
    public maxHours?: number,
    public practice?: boolean,
    public teacher?:Teacher,
    public teacherID?:string,

    public themes?:Theme[]
  ) {}
}
