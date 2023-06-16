import { FC, memo } from "react";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

interface Props {
  isFormValid?: boolean;
  isLoading?: boolean;
  isBackButtonVisible?: boolean;
  className?: string;
  handlePreviousStep?: () => void;
  handleNextStep?: () => void;
  backButtonLabel?: string;
  nextButtonLabel?: string;
}

const FormActions: FC<Props> = ({
  isFormValid = true,
  isLoading,
  isBackButtonVisible = true,
  handleNextStep,
  handlePreviousStep,
  backButtonLabel = "Back",
  nextButtonLabel = "Next",
  className
}) => {
  const backButtonHandler = () => {
    handlePreviousStep?.();
  };

  const nextButtonHandler = () => {
    handleNextStep?.();
  };

  return (
    <div className={`flex justify-between ${className ? className : ""}`}>
      <button
        className={`btn btn-primary btn-outline${!isBackButtonVisible ? " invisible" : ""}`}
        onClick={backButtonHandler}
      >
        <ChevronDoubleLeftIcon className="w-6" />
        {backButtonLabel}
      </button>
      <button
        disabled={!isFormValid || isLoading}
        type="submit"
        className={`btn ${isFormValid ? "btn-primary btn-outline" : ""}`}
        onClick={nextButtonHandler}
      >
        {isLoading && <span className="loading loading-spinner"></span>}
        {nextButtonLabel} <ChevronDoubleRightIcon className="w-6" />
      </button>
    </div>
  );
};

export default memo(FormActions);
