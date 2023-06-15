import { FC, memo, useMemo } from "react";
import { StepperStep } from "types/Common";

interface Props {
  currentStep: string;
  steps: StepperStep[];
}

const NecktieStepper: FC<Props> = ({ steps, currentStep }) => {
  const stepValues = useMemo(() => steps.map((step) => step.key), [steps]);
  const currentStepIndex = useMemo(
    () => stepValues.indexOf(currentStep),
    [currentStep, stepValues]
  );

  return (
    <ul className="steps">
      {steps?.length &&
        steps.map((step, index) => (
          <li
            key={step.key}
            data-content={currentStepIndex >= index ? "✓" : ""}
            className={`step ${currentStepIndex >= index ? "step-primary" : ""} ${
              currentStepIndex === index ? "font-bold" : "text-neutral-focus/20"
            }`}
          >
            {step.label}
          </li>
        ))}
    </ul>
  );
};

export default memo(NecktieStepper);
