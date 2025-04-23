import { redirect } from "next/navigation";
import { stripe } from "../lib/stripe";
import SuccessOrder from "../success-orders/page";
interface SuccessPageProps {
  searchParams: { session_id?: string };
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;
  if (!sessionId) {
    redirect("/");
  }
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer_details"],
  });
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
  const formattedProducts = lineItems.data.map((item) => ({
    description: item.description ?? "Produto sem descrição",
    quantity: item.quantity ?? 0,
    amount_total: item.amount_total ?? 0,
  }));
  
  return (
    <>
      <SuccessOrder
        name={session.customer_details?.name || "Cliente desconhecido"}
        email={session.customer_details?.email || "Email não informado"}
        products = {formattedProducts}
      />
      <div className="grid gap-3 justify-center">
        <h1 className="flex items-center justify-center bg-green-100 text-green-950 h-10 w-70 rounded-lg">
          Compra realizada com sucesso!
        </h1>
        <div className="grid items-center justify-around gap-3 bg-yellow-50 text-yellow-700 rounded-lg">
          <div>
            <p>Cliente: {session.customer_details?.name}</p>
            <p>Email: {session.customer_details?.email}</p>
          </div>
          {lineItems.data.map((item) => (
            <div
              key={item.id}
              className="flex gap-1 justify-around border-dashed border-b-1"
            >
              <p>{item.description}</p>
              <p>R${(item.amount_total! / 100).toFixed(2)}</p>
              <p>x {item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
