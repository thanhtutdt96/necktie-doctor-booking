import { Dispatch, FC, SetStateAction } from "react";
import FormActions from "components/doctor/doctor-booking-procedure/common/FormActions";
import FormErrorMessage from "components/doctor/doctor-booking-procedure/common/FormErrorMessage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { BookingFormData } from "types/Booking";

interface Props {
  setCurrentFormData: Dispatch<SetStateAction<BookingFormData>>;
  currentFormData: BookingFormData;
  onNextStep?: () => void;
}

const DoctorBookingStepFill: FC<Props> = ({ currentFormData, setCurrentFormData, onNextStep }) => {
  const initialValues = {
    name: currentFormData.name
  };

  const validateForm = ({ name }: BookingFormData) => {
    const errors: Record<string, string> = {};

    if (!name?.length) {
      errors.name = "Required";
    }

    if (name?.length && name?.length < 5) {
      errors.name = "Required at least 5 characters";
    }

    return errors;
  };

  const submitHandler = (formData: BookingFormData) => {
    setCurrentFormData({ ...currentFormData, ...formData });
    onNextStep?.();
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={submitHandler}
      validateOnChange={true}
      validateOnMount={true}
      enableReinitialize
    >
      {({ isValid }) => (
        <Form>
          <div className="flex justify-center flex-col items-center mb-10">
            <label htmlFor="name" className="label">
              <span className="label-text">What is your name?</span>
            </label>
            <div className="flex flex-col">
              <Field
                id="name"
                name="name"
                type="text"
                className="input input-bordered w-80"
                placeholder="Enter your name..."
              />
              <ErrorMessage
                name="name"
                render={(errorMessage) => <FormErrorMessage>{errorMessage}</FormErrorMessage>}
              />
            </div>
          </div>

          <FormActions
            isFormValid={isValid}
            isBackButtonVisible={false}
            className="fixed left-6 right-6 bottom-4"
          />
        </Form>
      )}
    </Formik>
  );
};

export default DoctorBookingStepFill;
