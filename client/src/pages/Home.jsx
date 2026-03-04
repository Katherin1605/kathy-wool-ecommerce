import Hero from "../components/Hero"
import { HiOutlineHeart } from "react-icons/hi2";

function Home() {

    return (
        <div>

            <Hero />

            <section className="container mt-5">

                <h2 className="text-center mb-4">
                    Productos Destacados
                </h2>


            </section>

            <section className="features">

                <div className="feature">
                    <div className="feature-icon">
                    <HiOutlineHeart />
                    </div>
                    <h4>Hecho a Mano</h4>
                    <p>Cada pieza es creada con dedicación artesanal.</p>
                </div>

                <div className="feature">
                    <span className="feature-icon">⭐</span>
                    <h4>Calidad Premium</h4>
                    <p>Materiales seleccionados para máxima durabilidad.</p>
                </div>

                <div className="feature">
                    <span className="feature-icon">🚚</span>
                    <h4>Envío Seguro</h4>
                    <p>Empaque especial para proteger cada producto.</p>
                </div>

            </section>

        </div>
    )
}

export default Home