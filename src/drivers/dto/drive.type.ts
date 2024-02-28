export interface IDriver {
  id?: string;
  drn: string;
  status?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  dateOfBirth: Date;
  phone: string;
  imageUrl?: string;
  address: string;
  country: string;
}

export interface IDriversQuery {
  page: number;
  limit: number;
  country: string;
  search: string;
}
