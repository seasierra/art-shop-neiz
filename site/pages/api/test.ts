import { NextApiRequest, NextApiResponse } from 'next'

import TelegramBot from 'node-telegram-bot-api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ваш токен Telegram бота
  const token = '6461155130:AAE6gQKNqyvdVeb_LgH7dCJSqVwUfFiPp1M'

  // Создаем экземпляр бота, используя токен
  const bot = new TelegramBot(token, { polling: false })

  // ID чата или пользователя, которому нужно отправить сообщение
  const chatId = '57166446'
  console.log('aaaaaaaa')
  console.log(req.body)
  console.log('bbbbbb')
  // Получение данных из объекта FormData

  console.log('aaaaaaaa')
  console.log(req.body)
  console.log('bbbbbb')

  const { name, email, message } = req.body

  // Отправляем сообщение в телеграмм
  try {
    await bot.sendMessage(
      chatId,
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    )
    console.log('Сообщение успешно отправлено в телеграмм')
    res
      .status(200)
      .json({ success: true, message: 'Сообщение успешно отправлено' })
  } catch (error) {
    console.error('Ошибка при отправке сообщения в телеграмм:', error.message)
    res.status(500).json({
      success: false,
      message: 'Ошибка при отправке сообщения в телеграмм',
    })
  }
}
