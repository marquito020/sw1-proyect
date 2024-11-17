import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { crearCuento } from "../../../services/cuento.service";
import { useNavigate } from "react-router-dom";
import { voces, nombreLenguages } from "../../../services/textToAudio.service";


const CrearCuento = () => {
    const [personaje, setPersonaje] = useState("");
    const [nombrePersonaje, setNombre] = useState("");
    const [tema, setTema] = useState("");
    const [reflexion, setReflexion] = useState("");
    let [narrador, setNarrador] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasEmptyFields, setHasEmptyFields] = useState(false);
    let [idioma, setIdioma] = useState("");
    let [nombreIdioma, setnombreIdioma] = useState("");
    const [listLenguages, setLenguages] = useState([]);
    const [listVoces, setVoces] = useState([]);


    const [selectHabilitado, setSelectHabilitado] = useState(false);



    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect");
        /* const vocesIdiomaActual =  voces({languageName: "US Spanish"})
        setVoces(vocesIdiomaActual);  */
        const obtenerVocesYLenguages = async () => {
            try {
                const vocesIdiomaActual = await voces({ languageCode: "es-US" });
                setVoces(vocesIdiomaActual);

                const data = await nombreLenguages();
                setLenguages(data);
            } catch (error) {
                console.log(error);
            }
        };

        obtenerVocesYLenguages();

    }, []);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "personaje":
                setPersonaje(value);
                break;
            case "nombre":
                setNombre(value);
                break;
            case "tema":
                setTema(value);
                break;
            case "reflexion":
                setReflexion(value);
                break;
            case "narrador":
                setNarrador(value);
                break;
            case "idioma": {
                const { text } = e.target.options[e.target.selectedIndex];
                console.log(text);
                console.log(value);
                setIdioma(value);
                if (value != 'Selecciona un idioma') {
                    setnombreIdioma(text)
                    setSelectHabilitado(true);
                    const vocesIdiomaActual = await voces({ languageCode: value });
                    setVoces(vocesIdiomaActual);
                    setNarrador("");
                } else {
                    setSelectHabilitado(false);
                }
                break;
            }
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emptyFields = checkEmptyFields();
        if (emptyFields) {
            setHasEmptyFields(true);
            return;
        }

        setIsLoading(true); // Inicia la carga

        const idUser = user.id;
        if (user.rol == "CuentaCuentos") {
            /* setIdioma("es-US");
            setnombreIdioma("Spanish");
            setNarrador("Lupe"); */
            idioma = "es-US";
            nombreIdioma = "Spanish";
            narrador = "Lupe";
        }
        if (user.rol == "Piloglota") {
            /* setIdioma("es-US");
            setnombreIdioma("Spanish");
            setNarrador("Lupe"); */
            narrador = "Lupe";
        }
        const cuento = { personaje, nombrePersonaje, tema, reflexion, narrador, idioma, nombreIdioma, idUser };

        try {
            const res = await crearCuento(cuento);
            await new Promise((resolve) => setTimeout(resolve, 20000));
            setIsLoading(false); // Detiene la carga
            navigate(`/private/cuento/${res.id}`);
        } catch (error) {
            console.log(error);
            setIsLoading(false); // Detiene la carga en caso de error
        }
    };

    const handleNextStep = () => {
        const emptyFields = checkEmptyFields();
        if (emptyFields) {
            setHasEmptyFields(true);
        } else {
            setCurrentStep((prevStep) => prevStep + 1);
            setHasEmptyFields(false);
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const checkEmptyFields = () => {
        if (isStepVisible(1) && personaje === "") {
            return true;
        }
        if (isStepVisible(2) && nombrePersonaje === "") {
            return true;
        }
        if (isStepVisible(3) && tema === "") {
            return true;
        }
        if (isStepVisible(4) && reflexion === "") {
            return true;
        }
        if (user.rol === "Narrador") {
            if (isStepVisible(5) && narrador === "") {
                return true;
            }
            if (isStepVisible(5) && idioma === "") {
                return true;
            } else {
                return false;
            }
        }
        if (user.rol === "Piloglota") {
            if (isStepVisible(5) && idioma === "") {
                return true;
            } else {
                return false;
            }
        }
        return false;
    };

    const isStepVisible = (step) => {
        return step === currentStep;
    };

    return (
        <div className="w-full p-12 bg-white shadow-xl rounded-xl max-w-3xl">


            <div style={{
                fontFamily: "Belgrano, serif", maxWidth: "600px", margin: "0 auto", display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "1rem",
                        color: "#2f3136",
                        fontSize: "28px",
                        fontWeight: "600",
                    }}
                >
                    Configura tu Cuento
                </h2>
                {isLoading && (

                    <p style={{ textAlign: "center" }}><img className="w-20 h-20" src="https://media.tenor.com/wpSo-8CrXqUAAAAj/loading-loading-forever.gif"
                    />cargando...</p>)}
                {!isLoading && (
                    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
                        {hasEmptyFields && <p style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>Por favor, completa todos los campos antes de continuar.</p>}
                        <label style={{ display: isStepVisible(1) ? "block" : "none", marginBottom: "1rem" }}>
                            <div className="text-indigo-500" style={{ fontSize: "20px", fontWeight: "600", marginBottom: "0.5rem" }}>
                                1. Elige Personaje:
                            </div>
                            <div style={{ color: "#2f3136", fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>
                                Un pirata, un ratón, un hada...
                            </div>
                            <div style={{ color: "#2f3136", fontSize: "16px", fontWeight: "400", marginBottom: "0.5rem" }}>
                                (0 de 30 caracteres)
                            </div>
                            <input
                                type="text"
                                name="personaje"
                                value={personaje}
                                onChange={handleInputChange}
                                maxLength={30}
                                required={isStepVisible(1)}
                                className="border-indigo-600 border-2 border-solid rounded-md"
                                style={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    marginBottom: "0.5rem",
                                    textTransform: "capitalize",
                                    accentColor: "#2f3136",
                                    color: "#2f3136",
                                    fontWeight: "600",
                                    fontSize: "18px",
                                    fontFamily: "Belgrano, serif",
                                    letterSpacing: "0.5px",
                                    lineHeight: "1.5",
                                    borderRadius: "4px",
                                    outline: "none",
                                    boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                                }}
                            />
                        </label>
                        <label style={{ display: isStepVisible(2) ? "block" : "none", marginBottom: "1rem" }}>
                            <div className="text-indigo-500" style={{ fontSize: "20px", fontWeight: "600", marginBottom: "0.5rem" }}>2. Dale un nombre:</div>
                            <div style={{ fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>Puede ser el que tú quieras, incluso el de tu hijo o hija</div>
                            <div style={{ fontSize: "16px", fontWeight: "400", marginBottom: "0.5rem" }}>(0 de 15 caracteres)</div>
                            <input
                                type="text"
                                name="nombre"
                                value={nombrePersonaje}
                                onChange={handleInputChange}
                                className="border-indigo-600 border-2 border-solid rounded-md"
                                maxLength={15}
                                required={isStepVisible(2)}
                                style={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    marginBottom: "0.5rem",
                                    textTransform: "capitalize",
                                    accentColor: "#2f3136",
                                    color: "#2f3136",
                                    fontWeight: "600",
                                    fontSize: "18px",
                                    fontFamily: "Belgrano, serif",
                                    letterSpacing: "0.5px",
                                    lineHeight: "1.5",
                                    borderRadius: "4px",
                                    outline: "none",
                                    boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                                }}
                            />
                        </label>
                        <label style={{ display: isStepVisible(3) ? "block" : "none", marginBottom: "1rem" }}>
                            <div className="text-indigo-500" style={{ fontSize: "20px", fontWeight: "600", marginBottom: "0.5rem" }}>3. Tema del cuento:</div>
                            <div style={{ fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>
                                Aquí puedes detallar el tema principal del cuento. Ejemplo: Un ratón al que no le gustaba compartir su queso
                            </div>
                            <div style={{ fontSize: "16px", fontWeight: "400", marginBottom: "0.5rem" }}>(0 de 120 caracteres)</div>
                            <textarea
                                name="tema"
                                value={tema}
                                onChange={handleInputChange}
                                maxLength={120}
                                required={isStepVisible(3)}
                                className="border-indigo-600 border-2 border-solid rounded-lg"
                                style={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    marginBottom: "0.5rem",
                                    textTransform: "capitalize",
                                    accentColor: "#2f3136",
                                    color: "#2f3136",
                                    fontWeight: "600",
                                    fontSize: "18px",
                                    fontFamily: "Belgrano, serif",
                                    letterSpacing: "0.5px",
                                    lineHeight: "1.5",
                                    outline: "none",
                                    transition: "border-color .2s ease-in-out",
                                    boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                                }}
                            />
                        </label>
                        <label style={{ display: isStepVisible(4) ? "block" : "none", marginBottom: "1rem" }}>
                            <div className="text-indigo-500" style={{ fontSize: "20px", fontWeight: "600", marginBottom: "0.5rem" }}>4. Reflexión:</div>
                            <div style={{ fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>(0 de 120 caracteres)</div>
                            <div style={{ fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>Esta parte se reserva para la reflexión que se quiere potenciar dentro de la trama.</div>
                            <div style={{ fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>Ejemplo: Aprender a compartir</div>
                            <div style={{ fontSize: "18px", fontWeight: "400", marginBottom: "0.5rem" }}>Enseñanza a transmitir</div>
                            <textarea
                                name="reflexion"
                                value={reflexion}
                                onChange={handleInputChange}
                                maxLength={120}
                                required={isStepVisible(4)}
                                className="border-indigo-600 border-2 border-solid rounded-lg"
                                style={{
                                    width: "100%",
                                    padding: "0.5rem",
                                    marginBottom: "0.5rem",
                                    textTransform: "capitalize",
                                    accentColor: "#2f3136",
                                    color: "#2f3136",
                                    fontWeight: "600",
                                    fontSize: "18px",
                                    fontFamily: "Belgrano, serif",
                                    letterSpacing: "0.5px",
                                    lineHeight: "1.5",
                                    outline: "none",
                                    boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                                }}
                            />
                        </label>
                        {(user.rol === "Narrador")
                            ? (

                                <label style={{ display: isStepVisible(5) ? "block" : "none", marginBottom: "1rem" }}>
                                    <div className="text-indigo-500" style={{ fontSize: "20px", fontWeight: "600", marginBottom: "0.5rem" }}>Escoge un Idioma:</div>
                                    <select
                                        name="idioma"
                                        value={idioma}
                                        onChange={handleInputChange}
                                        required={isStepVisible(5)}
                                        className="bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] bg-indigo-200"
                                        style={{
                                            width: "100%",
                                            padding: "0.5rem",
                                            marginBottom: "0.5rem",
                                            textTransform: "capitalize",
                                            accentColor: "#2f3136",
                                            color: "#2f3136",
                                            fontWeight: "600",
                                            fontSize: "18px",
                                            fontFamily: "Belgrano, serif",
                                            letterSpacing: "0.5px",
                                            lineHeight: "1.5",
                                            border: "1px solid #e3e5e8",
                                            borderRadius: "10px",
                                            outline: "none",
                                            transition: "border-color .2s ease-in-out",
                                            boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                                        }}
                                    >
                                        <option value="Selecciona un idioma">Selecciona un idioma</option>
                                        {listLenguages.map((lenguage, index) => (
                                            <option key={index} value={lenguage.languageCode}>{lenguage.languageName}</option>
                                        ))};
                                    </select>
                                    <div className="text-indigo-500" style={{ fontSize: "20px", fontWeight: "600", marginBottom: "0.5rem" }}>Escoge un narrador:</div>
                                    <select
                                        name="narrador"
                                        value={narrador}
                                        onChange={handleInputChange}
                                        disabled={!selectHabilitado}
                                        required={isStepVisible(5)}
                                        className="bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] bg-indigo-200"
                                        style={{
                                            width: "100%",
                                            padding: "0.5rem",
                                            marginBottom: "0.5rem",
                                            textTransform: "capitalize",
                                            accentColor: "#2f3136",
                                            color: "#2f3136",
                                            fontWeight: "600",
                                            fontSize: "18px",
                                            fontFamily: "Belgrano, serif",
                                            letterSpacing: "0.5px",
                                            lineHeight: "1.5",
                                            border: "1px solid #e3e5e8",
                                            borderRadius: "10px",
                                            outline: "none",
                                            transition: "border-color .2s ease-in-out",
                                            boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                                        }}
                                    >
                                        <option value="">Selecciona un narrador</option>
                                        {listVoces.map((voz, index) => (
                                            <option key={index} value={voz}>{voz}</option>
                                        ))};
                                    </select>
                                </label>
                            ) : (
                                user.rol === "Piloglota" && (
                                    <label style={{ display: isStepVisible(5) ? "block" : "none", marginBottom: "1rem" }}>
                                        <div style={{ fontSize: "20px", fontWeight: "600", marginBottom: "0.5rem", color: "rgba(8, 187, 182, 1)" }}>Escoge un Idioma:</div>
                                        <select
                                            name="idioma"
                                            value={idioma}
                                            onChange={handleInputChange}
                                            required={isStepVisible(5)}
                                            className="bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] bg-indigo-200"
                                            style={{
                                                width: "100%",
                                                padding: "0.5rem",
                                                marginBottom: "0.5rem",
                                                textTransform: "capitalize",
                                                accentColor: "#2f3136",
                                                color: "#2f3136",
                                                fontWeight: "600",
                                                fontSize: "18px",
                                                fontFamily: "Belgrano, serif",
                                                letterSpacing: "0.5px",
                                                lineHeight: "1.5",
                                                border: "1px solid #e3e5e8",
                                                borderRadius: "10px",
                                                outline: "none",
                                                transition: "border-color .2s ease-in-out",
                                                boxShadow: "0 1px 2px rgba(0,0,0,.1)",
                                            }}
                                        >
                                            <option value="Selecciona un idioma">Selecciona un idioma</option>
                                            {listLenguages.map((lenguage, index) => (
                                                <option key={index} value={lenguage.languageCode}>{lenguage.languageName}</option>
                                            ))};
                                        </select>
                                    </label>
                                )
                            )}
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={handlePreviousStep}
                                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 mr-2"
                            >
                                Anterior
                            </button>
                        )}
                        {currentStep < 5 && (
                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 "
                            >
                                Siguiente
                            </button>
                        )}
                        {currentStep === 5 && (
                            <button
                                type="submit"
                                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-400 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 "
                            >
                                Crear Cuento
                            </button>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

export default CrearCuento;
