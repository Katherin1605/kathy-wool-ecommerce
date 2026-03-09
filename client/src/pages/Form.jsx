import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Form() {

    const navigate = useNavigate()
    const MAX_CHARS = 500
    const [sent, setSent] = useState(false)
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        type: "Pedido especial",
        message: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let newErrors = {}
        if (!formData.name.trim()) {
            newErrors.name = "Nombre requerido"
        }
        if (!formData.email.includes("@")) {
            newErrors.email = "Email inválido"
        }
        if (!formData.message.trim()) {
            newErrors.message = "Escribe un mensaje"
        }
        setErrors(newErrors)
        
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validate()) return

        setSent(true)
    }

    if (sent) {
        return (
            <div className="container mt-5" style={{maxWidth:"600px"}}>
                <div className="card p-5 shadow-sm text-center">
                    <i className="bi bi-check-circle-fill text-success mb-3" style={{fontSize:"3rem"}}></i>
                    <h3 className="text-success mb-3">
                        Mensaje enviado correctamente
                    </h3>

                    <p>
                        Gracias por contactarnos. Nuestro equipo revisará tu mensaje.
                    </p>

            <div className="d-flex justify-content-center gap-4 mt-4">

                <button
                    className="btn btn-cart-primary btn-sm px-3"
                    onClick={() => {
                        setSent(false)
                        setFormData({
                            name: "",
                            email: "",
                            type: "Pedido especial",
                            message: ""
                        })
                    }}
                >
                    Enviar otro mensaje
                </button>

                <button
                    className="btn btn-outline-secondary btn-sm px-3"
                    onClick={() => navigate("/")}
                >
                    Volver al inicio
                </button>

            </div>
                </div>
            </div>
        )
    }


    return (
        <div className="container mt-5" style={{maxWidth:"600px"}}>
            <div className="text-center mb-4">
                <h2>Contacto</h2>
                <p className="text-muted small mt-2">
                    ¿Necesitas ayuda con tu pedido o quieres hacernos una consulta?  
                    Completa el formulario y te responderemos lo antes posible.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

                <div className="mb-3">
                    <label className="form-label">Nombre</label>

                    <div className="input-group">
                        <span className="input-group-text">
                        <i className="bi bi-person"></i>
                        </span>

                        <input
                        type="text"
                        name="name"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        onChange={handleChange}
                        />
                    </div>

                    {errors.name && (
                        <div className="invalid-feedback d-block">
                        {errors.name}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Correo</label>

                    <div className="input-group">
                        <span className="input-group-text">
                        <i className="bi bi-envelope"></i>
                        </span>

                        <input
                        type="email"
                        name="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        onChange={handleChange}
                        />
                    </div>

                    {errors.email && (
                        <div className="invalid-feedback d-block">
                        {errors.email}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Motivo</label>
                    <select
                        name="type"
                        className="form-select"
                        onChange={handleChange}
                    >
                        <option>Nuevo Pedido</option>
                        <option>Reclamos</option>
                        <option>Sugerencias</option>
                        <option>Felicitaciones</option>
                        <option>Soporte</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Mensaje</label>
                    <textarea
                        name="message"
                        className={`form-control ${errors.message ? "is-invalid" : ""}`}
                        rows="4"
                        maxLength={MAX_CHARS}
                        value={formData.message}
                        onChange={handleChange}
                    />
                    {errors.message && (
                        <div className="invalid-feedback d-block">
                        {errors.message}
                        </div>
                    )}

                    <div className="text-end small text-muted mt-1">
                        {formData.message.length} / {MAX_CHARS}
                    </div>
                </div>

                <button className="btn btn-cart-primary w-100">
                    Enviar mensaje
                </button>
            </form>

        </div>
    )
}

export default Form