export interface ITheme {
  id?: string;
  title?: string;
  description?: string;
  maxHours?: string;
  practice?: boolean;

}

export class Theme implements ITheme {
  constructor(
    public id?: string,
    public title?: string,
    public description?: string,
    public maxHours?: string,
    public practice?: boolean,
  ) {}
}
