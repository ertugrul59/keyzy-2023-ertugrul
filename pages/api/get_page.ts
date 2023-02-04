// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import * as cheerio from 'cheerio';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // res.status(200).json({ name: 'John Doe' })

  try{
    console.log('req.body', req?.body?.url)
    if(req?.body?.url){
      const result = await axios.get(req.body.url);

      if(!result.status){
        throw Error;
      }

      const $ = cheerio.load(result.data as any);

      const address = $("h1[itemprop='streetAddress']").text().trim();
      let postcode = address.substring(address.lastIndexOf(",") + 1).trim();

      console.log('postcode:', postcode);

      const price = $('._1gfnqJ3Vtd1z40MlC0MzXu').find('span').first().text().replace('£','');
      console.log(price); // £450,000

      res.status(200).send({ postcode, price });

      // $('.apple', '#fruits').text();
      // console.log('data:', data);
      // res.status(200).json({ data: data });
      // res.status(200).send(data);
      // res.status(200).json({ name: 'John Doe' })
    } else {
      throw Error;
    }

  } catch (error: any) {
     console.error(error)
     return res.status(error.status || 500).end(error.message)
   }
}
