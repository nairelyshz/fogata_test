import axios, { AxiosResponse } from "axios";

export class GeocoderService {
  constructor() {}

  getAddress({
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  }): Promise<AxiosResponse> {
    return axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
  }
}
