import { Configuration, OpenAIApi } from 'openai'
import { NextRequest, NextResponse } from 'next/server'

// 発行したAPI Keyを使って設定を定義
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const config = {
  runtime: 'edge',
}

export async function POST(request: NextRequest) {
  if (!configuration.apiKey) {
    return new NextResponse(
      JSON.stringify({
        error: {
          message:
            'OpenAI API key not configured, please follow instructions in README.md',
        },
      }),
      { status: 500 }
    )
  }

  // GPTに送るメッセージを取得
  const { message } = await request.json()
  //   リクエストのホスト名
  //   const domain = request.headers.get('host') ?? '不明'

  try {
    // 設定を諸々のせてAPIとやり取り
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: message,
      temperature: 0.9,
      max_tokens: 500,
    })
    // GPTの返答を取得
    return new NextResponse(
      JSON.stringify({ result: completion.data.choices[0].message }),
      { status: 200 }
    )
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
      return new NextResponse(JSON.stringify(error.response.data), {
        status: error.response.status,
      })
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      return new NextResponse(
        JSON.stringify({
          error: {
            message: 'An error occurred during your request.',
          },
        }),
        { status: 500 }
      )
    }
  }
}
