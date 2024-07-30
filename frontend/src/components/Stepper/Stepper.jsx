/**
 * Author : Nikita Davies
 */
import React from 'react';
import { Stepper, Step } from 'react-form-stepper';
import "./Stepper.css"

const FormStepper = ({currentStep, steps}) => {
  return (
    <div className="stepper-container">
      <Stepper activeStep={currentStep} 
      stepClassName={'stepper__step'}
       styleConfig={{
              activeBgColor: 'rgb(255 154 1)',
              activeColor: "#1A2529",
              activeTextColor: '#fff',
              inactiveBgColor: '#fff',
              inactiveTextColor: '#1A2529',
              completedBgColor: '#fff',
              completedTextColor: '#1A2529',
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
