import axios from "axios";

useEffect(() => {

  const fetchOrders = async () => {

    const res = await axios.get("/users/me/orders")

    setOrders(res.data)

  }

  fetchOrders()

}, [])

const MyOrders = () => {
  return (
    <div>
      <h3 className="fw-bold text-heading mb-4">Mis Pedidos</h3>
      <div className="card border-0 shadow-sm p-4 text-center">
        <i className="bi bi-box-seam fs-1 text-muted mb-3"></i>
        <p className="text-muted text-md">Aún no tienes pedidos realizados.</p>
      </div>
    </div>
  );
};

export default MyOrders;