import axios from "axios";

const addFavorite = async (productId) => {

  await axios.post("/users/me/favorites", {
    productId
  })

}

const removeFavorite = async (productId) => {

  await axios.delete(`/users/me/favorites/${productId}`)

}

const MyFavorites = () => {
  return (
    <div>
      <h3 className="fw-bold text-heading mb-4">Mis Favoritos</h3>
      <div className="card border-0 shadow-sm p-4 text-center">
        <i className="bi bi-heart fs-1 text-muted mb-3"></i>
        <p className="text-muted text-md">Aún no tienes productos guardados.</p>
      </div>
    </div>
  );
};

export default MyFavorites;