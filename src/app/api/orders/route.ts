import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
interface Product{
  description:string
  quantity: number
  total:number
}
interface OrderData {
  username:string
  email:string
  product: Product[]
  total: number
}
export async function POST(req: NextRequest) {
  const prisma = new  PrismaClient()
  const data = (await req.json()) as OrderData
  const {username,email}= data
  const order = await prisma.orders.create({
    data:{
      name: username,
      email: email
    }
  })
  return NextResponse.json({
    message: 'Ordem recebida com sucesso!',
    // data:{
    //   username,
    //   email,
    //   product,
    //   total
    // },
    order
  })
}
