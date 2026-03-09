function AdminOrders(){

  const orders = [
    {
      id:101,
      customer:"Katherin Hernández",
      total:170,
      status:"Pagado"
    },
    {
      id:102,
      customer:"Juan Pérez",
      total:55,
      status:"Pendiente"
    }
  ]

  return(

    <div>

      <h1>Pedidos</h1>

      <table className="admin-table">

        <thead>

          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>

        </thead>

        <tbody>

          {orders.map(order => (

            <tr key={order.id}>

              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )

}

export default AdminOrders