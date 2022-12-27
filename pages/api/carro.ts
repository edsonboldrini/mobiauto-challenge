import { NextApiRequest, NextApiResponse } from "next/types"
import { FipeService } from "../../src/services/FipeService"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { brand, model, year } = req.query as { [key: string]: string }

  if (!brand || !model || !year) {
    return res.redirect(`/busca`)
  }

  const vehicleData = await FipeService.getVehicleData(brand, model, year)

  if (!vehicleData) {
    return res.redirect(`/busca`)
  }

  res.setPreviewData({})
  res.redirect(`/resultado?brand=${brand}&model=${model}&year=${year}`)
}