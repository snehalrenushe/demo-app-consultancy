export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  age: number;
  state: string;
  country: string;
  address: string;
  jobs: [];
  newsletter: boolean;
  profilePhotoPath: string;
}
