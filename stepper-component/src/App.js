import "./App.css";
import CheckoutStepper from "./components/CheckoutStepper";

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <div>Provide your contact details.</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your shipping address.</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: "Delivered",
    Component: () => <div> Your order has been delivered.</div>,
  },
];

function App() {
  return (
    <div>
      <h1 className="text-center text-3xl text-black font-bold my-3">
        Stepper Component
      </h1>
      <CheckoutStepper chekoutSteps={CHECKOUT_STEPS} />
    </div>
  );
}

export default App;
