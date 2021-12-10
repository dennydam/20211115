import template from '../template/flex.js'
import axios from 'axios'

export default async (event) => {
  const flexregion = event.message.text.replace('找車位', '')
  const flex = JSON.parse(JSON.stringify(template))
  let index = 0

  try {
    const { data } = await axios.get('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json')
    for (const info of data.data.park) {
      if (info.area === flexregion) {
        if (index > 7) break
        flex.contents.contents.push({
          type: 'bubble',
          size: 'micro',
          hero: {
            type: 'image',
            url: 'https://media.istockphoto.com/photos/empty-parking-garage-in-hospital-picture-id1219730178?k=20&m=1219730178&s=612x612&w=0&h=3XCdGM52zWDA-RtqjEmI8p9t0QXn5OGhqLnpBvSnCEI=',
            size: 'full',
            aspectMode: 'cover',
            aspectRatio: '320:213'
          },
          body: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'text',
                text: info.name,
                weight: 'bold',
                size: 'sm',
                wrap: true
              },
              {
                type: 'box',
                layout: 'baseline',
                contents: [
                  {
                    type: 'icon',
                    size: 'xs',
                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                  },
                  {
                    type: 'icon',
                    size: 'xs',
                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                  },
                  {
                    type: 'icon',
                    size: 'xs',
                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                  },
                  {
                    type: 'icon',
                    size: 'xs',
                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png'
                  },
                  {
                    type: 'icon',
                    size: 'xs',
                    url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png'
                  },
                  {
                    type: 'text',
                    text: '4.0',
                    size: 'xs',
                    color: '#8c8c8c',
                    margin: 'md',
                    flex: 0
                  }
                ]
              },
              {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: info.address,
                        wrap: true,
                        color: '#8c8c8c',
                        size: 'xs',
                        flex: 5
                      }
                    ]
                  }
                ]
              }
            ],
            spacing: 'sm',
            paddingAll: '13px',
            action: {
              type: 'message',
              label: 'action',
              text: '!name' + info.name
            }
          }
        })
        index++
      }
    }

    if (index > 0) {
      event.reply(flex)
    } else {
      event.reply('找不到資料')
    }
  } catch (error) {
    console.log(error)
  }
}
