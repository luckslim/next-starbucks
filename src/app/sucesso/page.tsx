import { redirect } from 'next/navigation'
import { stripe } from '../lib/stripe'

interface SuccessPageProps {
  searchParams: { session_id?: string }
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    redirect('/')
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer_details'],
  })

  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)

  return (
    <div className='grid justify-center'>
      <h1>Compra realizada com sucesso!</h1>
      <p>Nome: {session.customer_details?.name}</p>
      <p>Email: {session.customer_details?.email}</p>

      <h2 className="mt-4 text-lg font-bold">Produtos:</h2>
      <ul className="mt-2 space-y-2">
        {lineItems.data.map((item) => (
          <li key={item.id} className="border p-2 rounded-md">
            <p className="font-semibold">{item.description}</p>
            <p>Quantidade: {item.quantity}</p>
            <p>Preço: R${(item.amount_total! / 100).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
