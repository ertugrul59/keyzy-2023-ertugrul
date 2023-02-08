import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req?.body?.url) {
      const result = await axios.get(req.body.url);

      if (!result.status) {
        throw Error;
      }

      const $ = cheerio.load(result.data as any);

      const address = $("h1[itemprop='streetAddress']").text().trim();
      const postcode = address.substring(address.lastIndexOf(",") + 1).trim();

      const price = $("._1gfnqJ3Vtd1z40MlC0MzXu")
        .find("span")
        .first()
        .text()
        .replace("£", "");

      res.status(200).send({ postcode, price });
    } else {
      throw Error;
    }
  } catch (error: any) {
    console.error(error);
    return res.status(error.status || 500).end(error.message);
  }
}
