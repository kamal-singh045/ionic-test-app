export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  address?: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
    state: string;
  },
  age: number;
  university: string;
}
