function Hero() {
    return (

        <section className="hero">

            <div className="hero-content">

                <h1>Bienvenido a KathyWool</h1>

                <p>
                    Tejidos artesanales hechos con amor y dedicación
                </p>

                <button onClick={() => window.location.href = "/products"}
                    className="btn-primary">
                    <i className="bi bi-stars"></i> Explorar Galería
                </button>

            </div>

        </section>

    )
}

export default Hero