import { BunnyCdnStream } from 'bunnycdn-stream'

export const stream = new BunnyCdnStream({
  videoLibrary: process.env.BUNNY_LIBRARY_ID,
  apiKey: process.env.BUNNY_API_KEY,
})
