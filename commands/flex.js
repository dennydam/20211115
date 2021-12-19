import template from '../template/flex.js'
import axios from 'axios'

export default async (event) => {
  const flexregion = event.message.text.replace('找車位', '')
  try {
    const results = []
    const results777 = []
    const { data } = await axios.get('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json')
    for (const info of data.data.park) {
      if (info.area === flexregion) {
        results.push({
          type: 'location',
          title: info.name,
          address: info.address,
          latitude: info.EntranceCoord.EntrancecoordInfo[0].Xcod,
          longitude: info.EntranceCoord.EntrancecoordInfo[0].Ycod

        })

        if (results.length >= 6) {
          const flex = JSON.parse(JSON.stringify(template))
          flex.altText = '哈囉'
          for (let i = 0; i < 6; i++) {
            flex.contents.contents[i].body.contents[0].text = results[i].title
            flex.contents.contents[i].body.action.text = '!name' + results[i].title

            flex.contents.contents[i].body.contents[2].contents[0].contents[0].text = results[i].address
          }
          results777.push(flex)
          break
        }
      }
    }

    console.log(results)
    if (results.length > 0) {
      event.reply(results777)
    } else {
      event.reply('找不到')
    }
  } catch (error) {
    event.reply('錯誤')
  }
}
// flex.altText = '哈囉'
// event.reply(flex)
