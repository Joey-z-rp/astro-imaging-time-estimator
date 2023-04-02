import { writeFile } from "node:fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = JSON.parse(req.body);
  const json = JSON.stringify(data, null, 2);
  const fileName = data.createdAt.replaceAll(" ", "").replace(/[\/,\s]/g, "-");
  await writeFile(`training-data/${fileName}.json`, json, "utf8");

  res.status(200).json({});
}
