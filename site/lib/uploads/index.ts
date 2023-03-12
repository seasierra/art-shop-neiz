type UploadSize = [number, number]

export type UploadItem = [string, UploadSize]

type Case = { case: string; slides: UploadItem[] }

type UploadsIndex = { category: string; cases: Case[] }[]

export default {
  showcase: require('./showcase.json') as UploadsIndex,
}

// assets = temp1.map(([,meta]) => ({ [meta.public_id]: [meta.width, meta.height] })).reduce((a,b) => Object.assign({}, a, b), {})

// sho.map((a) => ({
//   category: a[0],
//   cases: a[1].map((b) => ({
//     case: b.title,
//     slides: b.slides.map((slide) => [`assets/${slide}`, assets[slide]]),
//   })),
// }))
