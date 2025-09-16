export interface Company {
  name: string;
  address: string;
  email: string;
  phone: string;
  gstin: string;
  state: string;
  stateCode: string;
  bankName: string;
  bankBranch: string;
  accountNumber: string;
  ifscCode: string;
  logo: string;
  status: 'Active' | 'Inactive';
  verified: boolean;
}
