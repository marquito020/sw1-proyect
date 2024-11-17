import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateRol } from "../../hooks/userUsers.hook";
import { BASE_URL, PrivateRoutes } from "../../constants/routes";
import { loadStripe } from "@stripe/stripe-js";
import { createUser } from "../../redux/states/user.state";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY
);

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  const { id } = useParams();
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    if (id === "1") {
      setPayment([...payment, "Narrador", "30"]);
      //setPayment([...payment, "30"]);
    } else if (id === "2") {
      setPayment([...payment, "Piloglota", "15"]);
      //setPayment([...payment, "15"]);
    }
  }, [id]);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { updateRol } = useUpdateRol(user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: user.name,
        email: user.email,
      },
    });
    setLoading(true);

    if (!error) {
      const amount = payment[1] * 100;
      const description = `Pago Usuario ${payment[0]}`;
      //console.log(paymentMethod)
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(`${BASE_URL}/api/checkout`, {
          id,
          amount, //cents
          description,
        });
        console.log(data);

        elements.getElement(CardElement).clear();

        const rol = payment[0];
        try {
          const response = await updateRol({ rol });
          dispatch(createUser(response));
          if (response?.id) {
            console.log("se cambio el rol");
            navigate(PrivateRoutes.PRIVATE, { replace: true });
            setMessageError("");
          } else if (response && "message" in response) {
            setMessageError(response.message);
          }
        } catch (err) {
          console.log(err);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold mb-8">
          Realizar Pago: {payment[0]} {payment[1]} $us
        </h1>
        <div className="max-w-lg w-screen bg-white p-8 rounded shadow">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cardNumber"
            >
              Número de tarjeta
            </label>
            {/* <div className="flex items-center border rounded py-2 px-3 shadow-sm">
                            <FaCreditCard className="text-gray-400 mr-2" />
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                                id="cardNumber"
                                type="text"
                                pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
                                inputMode="numeric"
                                title="Ingrese un número de tarjeta válido"
                                placeholder="0000 0000 0000 0000"
                                required
                            />
                            
                        </div> */}
            <CardElement />
          </div>
          {/* Error */}
          {messageError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{messageError}</span>
            </div>
          )}

          {/* <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardHolderName">
                            Nombre Del Titular
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="cardHolderName"
                            type="text"
                            placeholder="Nombre y Apellido"
                            required
                        />
                    </div> */}
          <button
            disabled={!stripe}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Pagar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const BuyingPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};
export default BuyingPage;
