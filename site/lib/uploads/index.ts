type UploadsIndex = [[string, { title: string; slides: string[] }[]]]

export default {
  showcase: require('./showcase.json') as UploadsIndex,
}
