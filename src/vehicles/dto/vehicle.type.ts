export interface IVehicle {
  id?: string;
  vin: string;
  marketCode: string;
  countryCodeOfRegistration: string;
  engineNumber: string;
  model: string;
  yearOfProduction: number;
  purchaseCurrency: string;
  color: string;
  purchaseDate: Date;
  supplier: string;
  regNo?: string;
  purchasePrice?: number;
  description?: string;
  salikTagNo?: string;
  salikAccountNo?: string;
}
