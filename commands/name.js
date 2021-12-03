import axios from 'axios'

export default async (event) => {
  const region = event.message.text.replace('!name', '')
  try {
    const replies = []
    // const idreplies = []
    const { data } = await axios.get('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json')
    for (const info of data.data.park) {
      if (info.name === region) {
        // idreplies.push(info.id)
        replies.push({
          type: 'location',
          title: info.name,
          address: info.address,
          latitude: info.EntranceCoord.EntrancecoordInfo[0].Xcod,
          longitude: info.EntranceCoord.EntrancecoordInfo[0].Ycod
        })
        if (replies.length >= 5) {
          break
        }
        event.reply(replies)
        // console.log(idreplies)
      }
    } event.reply('找不到')
  } catch (error) {
    event.reply('錯誤')
  }
}
