export type ThemeMode = 'dark' | 'light';
export type UserRole = 'buyer' | 'seller' | 'dealer' | 'admin';
export type SellerType = 'private' | 'dealer';
export type BodyType = 'truck' | 'SUV' | 'sedan' | 'van' | 'ATV' | 'snowmobile' | 'boat' | 'RV';
export type VehicleCondition = 'new' | 'excellent' | 'good' | 'fair' | 'project';

export interface SellerProfile {
  name: string;
  type: SellerType;
  phone: string;
  location: string;
  rating: number;
  responseTime: string;
  dealerName?: string;
}

export interface Vehicle {
  id: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  bodyType: BodyType;
  mileage: number;
  price: number;
  condition: VehicleCondition;
  fuelType: 'gas' | 'diesel' | 'electric' | 'hybrid';
  transmission: string;
  drivetrain: string;
  engine: string;
  color: string;
  features: string[];
  modifications: string[];
  description: string;
  photos: string[];
  titleStatus: string;
  accidentHistory: string;
  ownerCount: number;
  winterPackage: boolean;
  studdedTires: boolean;
  rustRating: string;
  seller: SellerProfile;
  marketAverage: number;
  location: string;
  city: string;
  lat: number;
  lng: number;
  postedAt: string;
  status: 'active' | 'sold';
  views: number;
}
