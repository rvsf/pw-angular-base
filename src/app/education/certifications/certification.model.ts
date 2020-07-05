export interface ICertification {
  id?: string;
  certName?: string;
  issuingOrg?: string;
  expires?: boolean;
  issuingDate?: Date;
  expireDate?: Date;
  certCode?: string;
  certUrl?: string
}

export class Certification implements ICertification {
  constructor(
    public id?: string,
    public certName?: string,
    public issuingOrg?: string,
    public expires?: boolean,
    public issuingDate?: Date,
    public expireDate?: Date,
    public certCode?: string,
    public certUrl?: string
  ) {}
}
