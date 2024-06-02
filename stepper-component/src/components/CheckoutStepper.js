import React, { useEffect, useRef, useState } from "react";

const CheckoutStepper = ({ chekoutSteps }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  const ActiveComponent = chekoutSteps[currentStep - 1]?.Component;

  const handleStep = () => {
    setCurrentStep((val) => {
      if (val === chekoutSteps.length) {
        setIsComplete(true);
        return val;
      } else {
        return val + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (chekoutSteps.length - 1)) * 100;
  };

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[chekoutSteps.length - 1].offsetWidth / 2,
    });
  }, [stepRef]);

  if (!chekoutSteps.length) return <></>;
  return (
    <>
      <div className="stepper relative flex justify-between items-center py-4 px-4">
        {chekoutSteps.map((step, index) => (
          <div
            ref={(el) => (stepRef.current[index] = el)}
            className={`step flex flex-col items-center px-2 ${
              currentStep > index + 1 || isComplete ? "complete" : ""
            } ${currentStep === index + 1 ? "active" : ""}`}
            key={step.name}
          >
            <div
              className={`stepnumber w-8 h-8 rounded-2xl flex justify-center items-center mb-1 z-10
        ${
          currentStep > index + 1 || isComplete
            ? "bg-green-500 text-white"
            : "bg-slate-300"
        } 
        ${currentStep === index + 1 ? "bg-blue-500 text-white" : ""}
      `}
            >
              {currentStep > index + 1 || isComplete ? (
                <span>&#10003;</span>
              ) : (
                index + 1
              )}
            </div>
            <div className="font-semibold text-xl">{step.name}</div>
          </div>
        ))}
      </div>

      <div
        className="progress-bar absolute top-[25%] left-0 h-1 bg-gray-300"
        style={{
          width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
          marginLeft: margins.marginLeft,
          marginRight : margins.marginRight
        }}
      >
        <div
          className="progress h-full bg-green-400 transition-all duration-200 ease-in-out"
          style={{ width: `${calculateProgressBarWidth()}%` }}
        ></div>
      </div>
        
       <div className="flex justify-center mx-auto my-4 font-medium text-2xl"> 
      <ActiveComponent />
      </div>

      {!isComplete && (
        <button
          className="flex justify-center mx-auto my-11 bg-gray-400 text-xl font-medium p-2 rounded-lg text-white"
          onClick={handleStep}
        >
          {currentStep === chekoutSteps.length ? "Complete" : "Next"}
        </button>
      )}
    </>
  );
};

export default CheckoutStepper;
