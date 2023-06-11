import { Configuration, OpenAIApi } from 'openai'
import { NextRequest, NextResponse } from 'next/server'

// 発行したAPI Keyを使って設定を定義
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

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
  } catch (error: unknown) {
    if (error instanceof Error && 'response' in error) {
      // responseError.response.status と responseError.response.data へのアクセスをTypeScriptに対して許可する
      const responseError = error as { response: { status: number; data: any } }

      console.error(responseError.response.status, responseError.response.data)
      return new NextResponse(JSON.stringify(responseError.response.data), {
        status: responseError.response.status,
      })
    } else {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred'

      console.error(`Error with OpenAI API request: ${message}`)
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
