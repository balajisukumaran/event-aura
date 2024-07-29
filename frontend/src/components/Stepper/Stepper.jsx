import React from 'react';
import { Stepper, Step } from 'react-form-stepper';
import "./Stepper.css"

const FormStepper = ({currentStep, steps}) => {
  return (
    <div className="stepper-container">
      <Stepper activeStep={currentStep} 
      stepClassName={'stepper__step'}
       styleConfig={{
              activeBgColor: '#176fcd',
              activeTextColor: '#fff',
              inactiveBgColor: '#fff',
              inactiveTextColor: '#2b7cff',
              completedBgColor: '#fff',
              completedTextColor: '#2b7cff',
              size: '2em'
            }}>
        {steps.map((step, index) => (
          <Step key={index} label={step.label} />
        ))}
      </Stepper>
    </div>
  );
};

export default FormStepper;
