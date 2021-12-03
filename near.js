import axios from 'axios'
import distance from './經緯度間距離.js'
export default async (event) => {
  try {
    const results = []
    const { data } = await axios.get('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json')
    for (const info of data.data.park) {
      if (distance(event.message.latitude, event.message.longitude, info.EntranceCoord.EntrancecoordInfo[0].Xcod, info.EntranceCoord.EntrancecoordInfo[0].Ycod, 'K') < 2) {
        results.push({
          type: 'location',
          title: info.name,
          address: info.address,
          latitude: info.EntranceCoord.EntrancecoordInfo[0].Xcod,
          longitude: info.EntranceCoord.EntrancecoordInfo[0].Ycod
        })
        console.log(distance(event.message.latitude, event.message.longitude, info.EntranceCoord.EntrancecoordInfo[0].Xcod, info.EntranceCoord.EntrancecoordInfo[0].Ycod, 'K'))

        if (results.length >= 5) {
          break
        }
      }
    }
    console.log(results)

    if (results.length > 0) {
      event.reply(results)
    } else {
      event.reply('找不到')
    }
  } catch (error) {
    event.reply('錯誤')
  }
}
