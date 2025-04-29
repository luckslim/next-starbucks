"use client";
import { useEffect } from "react";
import { api } from "../lib/axios";
import { useSession } from "next-auth/react";
interface Product {
  description: string;
  quantity: number;
  amount_total: number;
}
interface Props {
  name?: string;
  email?: string;
  products: Product[];
}
export default function SuccessOrder({ email, name, products }: Props) {
  const { data: session, status } = useSession();
  useEffect(() => {
    async function registerOrder() {
      try {
        const formattedProducts = products.map((product) => ({
          description: product.description,
          quantity: product.quantity,
          total: product.amount_total / 100,
        }));
        const totalAmount =
          products.reduce((acc, product) => {
            return acc + product.amount_total;
          }, 0) / 100;
        const nameNew = session?.user?.name
        const emailNew = session?.user?.email

        if (!nameNew || !emailNew) {
          console.warn("Nome ou email não disponível na sessão.");
          return;
        }
        await api.post("/orders", {
          username: nameNew,
          email: emailNew,
          products: formattedProducts,
          total: totalAmount,
        });
      } catch (err) {
        console.error("Erro ao registrar pedido:", err);
      }
    }

    registerOrder();
  }, [name, email, status, products]);
  return null
}

