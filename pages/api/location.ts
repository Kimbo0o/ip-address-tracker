import fetch from "node-fetch";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ILocationAPIExternalData,
  ILocationAPIInternalData,
} from "../../models/location-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any> //TODO: Define type
) {
  const { target }: { target: string } = req.body;
  if (target?.length) {
    let targetParam = _isValidIP(target)
      ? `ipAddress=${target}`
      : `domain=${target}`;
    const key = process.env.GEOLOCATION_APIKEY;
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&${targetParam}`;
    console.log(url);
    const response = await fetch(url);
    const extData = (await response.json()) as ILocationAPIExternalData;
    const data: ILocationAPIInternalData = {
      ip: extData.ip,
      location: `${extData.location.city}, ${extData.location.region} ${extData.location.postalCode}`,
      timezone: extData.location.timezone,
      isp: extData.isp,
    };
    res.status(200).json({ data });
  } else {
    res.status(400).json({ message: "Invalid input" });
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
