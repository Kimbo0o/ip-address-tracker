import fetch from "node-fetch";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ILocationAPIExternalData,
  ILocationAPIInternalData,
} from "../../models/location-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const target = req.body.target || req.headers["x-nf-client-connection-ip"];
  let targetParam = _isValidIP(target)
    ? `ipAddress=${target}`
    : `domain=${target}`;
  const key = process.env.GEOLOCATION_APIKEY;
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&${targetParam}`;
  const response = await fetch(url);
  const extData = (await response.json()) as ILocationAPIExternalData;
  if (extData.ip) {
    const data: ILocationAPIInternalData = {
      ip: extData.ip,
      location: `${extData.location.city}, ${extData.location.region} ${extData.location.postalCode}`,
      timezone: extData.location.timezone,
      isp: extData.isp,
      lat: extData.location.lat,
      lng: extData.location.lng,
    };
    res.status(200).json({ data, address: target });
  } else {
    res.status(422).json({ message: "Input could not be processed" });
  }
}

/**
 * Checks if value is valid ip
 * @param value
 * @returns
 */
const _isValidIP = (value: string): boolean => {
  const regEx = new RegExp("^((25[0-5]|(2[0-4]|1d|[1-9]|)d)(.(?!$)|$)){4}$");
  return regEx.test(value);
};
