"use client"
import { useEffect } from "react"
import { api } from "../lib/axios"
interface Product{
  description:string
  quantity:number 
  amount_total:number 
}
interface Props{
    name:string 
    email: string
    products: Product[]
}
export default function SuccessOrder({email,name, products}:Props){
    useEffect(() => {
        async function registerOrder() {
          try {
            const formattedProducts = products.map((product) => ({
              description: product.description,
              quantity: product.quantity,
              total: product.amount_total / 100,
            }));
            const totalAmount = products.reduce((acc, product) => {
              return acc + product.amount_total;
            }, 0) / 100;
            
            await api.post('/orders', {
              username: name,
              email: email,
              products: formattedProducts,
              total: totalAmount,
            })
          } catch (err) {
            console.error('Erro ao registrar pedido:', err)
          }
        }
    
        registerOrder()
      }, [name, email, products])
      
    return ''
}