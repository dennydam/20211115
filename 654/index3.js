import 'dotenv/config'
import linebot from 'linebot'
import axios from 'axios'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN

})

bot.on('message', async (event) => {
  if (event.message.type === 'text' && event.message.text === '信義區') {
    try {
      const { Data } = await axios.get('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json')
      const replies = []
      for (let i = 0; i <= Data.data.park.length; i++) {
        replies.push('a')
      } event.reply(replies)
      console.log(Data.data.park.length)
    } catch (error) {
      event.reply('錯誤')
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
