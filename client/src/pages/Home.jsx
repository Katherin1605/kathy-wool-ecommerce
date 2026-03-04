import Hero from "../components/Hero"
import { HiOutlineHeart, HiOutlineSparkles, HiOutlineShoppingCart } from "react-icons/hi2";

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
                    <p>Cada pieza es única y elaborada con cuidado artesanal</p>
                </div>

                <div className="feature">
                    <div className="feature-icon">
                    <HiOutlineSparkles />
                    </div>
                    <h4>Calidad Premium</h4>
                    <p>Utilizamos lanas y materiales de la más alta calidad</p>
                </div>

                <div className="feature">
                    <div className="feature-icon">
                    <HiOutlineShoppingCart />
                    </div>
                    <h4>Envío Seguro</h4>
                    <p>Empaque cuidadoso para que tu producto llegue perfecto.</p>
                </div>

            </section>

        </div>
    )
}

export default Home