import axios from 'axios'

export default async (event) => {
  const space = event.message.text.replace('剩餘', '')
  try {
    const replys = []
    // const idreplies = []
    const { data } = await axios.get('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json')
    for (const info of data.data.park) {
      if (info.id === space) {
        // idreplies.push(info.id)
        replys.push(info.availablemotor
        )
        if (replys.length >= 5) {
          break
        }
      }
    }
    console.log(replys)
    if (replys.length > 0) {
      event.reply(replys)
      console.log(replys)
    } else {
      event.reply('找不到')
    }
  } catch (error) {
    event.reply('錯誤')
  }
}
