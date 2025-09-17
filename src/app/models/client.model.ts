export interface Client {
  _id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  gstin: string;
  state: string;
  stateCode: string;
  status: 'Active' | 'Inactive';
}
