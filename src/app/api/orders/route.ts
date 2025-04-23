import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()
  return NextResponse.json({
    message: 'Ordem recebida com sucesso!',
    data,
  })
}
