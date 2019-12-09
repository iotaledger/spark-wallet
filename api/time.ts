import { NowRequest, NowResponse } from '@now/node'
import { NTPClient } from 'ntpclient'

export default async function(_req: NowRequest, res: NowResponse) {
    const client = new NTPClient()
    const time = await client.getNetworkTime()
    res.json({ time: time.getTime() })
}
