import { NowRequest, NowResponse } from '@now/node'

export default function(req: NowRequest, res: NowResponse) {
    const manifest = {
        name: 'Spark wallet',
        short_name: 'Spark wallet',
        lang: 'en-US',
        start_url: '/',
        display: 'standalone',
        background_color: '#eef1f3',
        theme_color: '#eef1f3',
        icons: [
            {
                src: '/icons/192x192.png',
                type: 'image/png',
                sizes: '192x192'
            },
            {
                src: '/icons/512x512.png',
                type: 'image/png',
                sizes: '512x512'
            }
        ]
    }

    const ua = req.headers['user-agent']

    if (ua.indexOf('iPhone') > 0) {
        manifest.display = 'browser'
    }

    res.json(manifest)
}
