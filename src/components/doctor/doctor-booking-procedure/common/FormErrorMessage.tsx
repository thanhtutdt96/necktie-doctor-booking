import { ReactNode } from "react";

const FormErrorMessage = ({ children }: { children: ReactNode }) => (
  <div className="text-error mt-2 text-xs">{children}</div>
);

export default FormErrorMessage;
