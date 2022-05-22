import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const respose = await fetch(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY
          ? process.env.NEXT_PUBLIC_RESAS_API_KEY
          : "",
      },
    }
  );

  const data = await respose.json();
  res.status(200).json({ data });
}
