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
  const target =
    req.body.target || req.headers["x-nf-client-connection-ip"] || null;
  if (target) {
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
      res.status(200).json({ data, success: true });
    } else {
      res.status(422).json({
        message: "Input could not be processed",
        success: false,
        target: target,
      });
    }
  } else {
    res.status(400).json({ message: "No IP/Target provided", success: false });
  }
}

/**
 * Checks if value is valid ip
 * @param value
 * @returns
 */
const _isValidIP = (value: string): boolean => {
  const regExV4 = new RegExp("^((25[0-5]|(2[0-4]|1d|[1-9]|)d)(.(?!$)|$)){4}$");
  const isV4 = regExV4.test(value);
  if (isV4) {
    return true;
  } else {
    const regEXV6 = new RegExp(
      "(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))"
    );
    return regEXV6.test(value);
  }
};
