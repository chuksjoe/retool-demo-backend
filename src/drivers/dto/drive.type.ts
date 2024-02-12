export interface IDriver {
  id?: string;
  drn: string;
  status?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  imageUrl?: string;
  address: string;
  country: string;
}
