// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  name: string
}


const headers = {
  'Content-Type': 'application/json'
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // res.status(200).json({ name: 'John Doe' })

  try{
    console.log('req.body', req?.body?.url)
    if(req?.body?.url){
      const data = await axios.get(req.body.url);

      if(!data){
        throw Error;
      }

      console.log('data:', data);
      // res.status(200).json({ data: data });
      // res.status(200).send(data);

      res.status(200).json({ name: 'John Doe' })
    } else {
      throw Error;
    }

  } catch (error: any) {
     console.error(error)
     return res.status(error.status || 500).end(error.message)
   }
}
