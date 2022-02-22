export interface ILocationAPIExternalData {
  ip: string;
  isp: string;
  location: ILocationAPIExternalDataLocation;
}

interface ILocationAPIExternalDataLocation {
  city: string;
  region: string;
  timezone: string;
  postalCode: string;
  lat: number;
  lng: number;
}

export interface ILocationAPIInternalData {
  ip: string;
  location: string;
  timezone: string;
  isp: string;
  lat: number;
  lng: number;
}
