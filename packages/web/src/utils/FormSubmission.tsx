import type React from 'react';
import { useState } from 'react';

const FormSubmission = (callback: any, initialState: any) => {
  const [valuesInput, setValuesInput] = useState(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValuesInput({ ...valuesInput, [event.target.name]: [event.target.value][0] });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await callback();
  };

  return { onChange, onSubmit, valuesInput };
};

export default FormSubmission;
