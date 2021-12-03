import 'dotenv/config'
import linebot from 'linebot'
import name from './commands/name.js'
import flex from './commands/flex.js'
import near from './near.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN

})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動666')
})

bot.on('message', async (event) => {
  if (event.message.type === 'text') {
    if (event.message.text.startsWith('!name')) {
      name(event)
    } else if (event.message.text.startsWith('!flex')) {
      flex(event)
    }
  }
  if (event.message.type === 'location') {
    if (event.message.type === 'location') {
      // console.log(666)
      // console.log(event.message.latitude)
      // console.log(event.message.longitude)
      near(event)
      // console.log(distance(event.message.latitude, event.message.longitude, 25, 121) * 1.609344)
      // near()
    }
  }
})
