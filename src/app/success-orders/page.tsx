"use client"
import { useEffect } from "react"
import { api } from "../lib/axios"
interface Props{
    name:string 
    email: string
}
export default function SuccessOrder({email,name}:Props){
    useEffect(() => {
        async function registerOrder() {
          try {
            await api.post('/orders', {
              username: name,
              email: email,
            })
          } catch (err) {
            console.error('Erro ao registrar pedido:', err)
          }
        }
    
        registerOrder()
      }, [name, email])
    return ''
}