import { useCallback, useState } from 'react';
import { errorType } from 'utils/constants';

export default function useFormValidatorHook() {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [inputErrors, setInputErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const setErrorMessage = (name: string, errorMessage: string) => {
    setInputErrors({ ...inputErrors, [name]: errorMessage });
  };

  const handleInputChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLFormElement;
    const { name, value } = target;
    const form = target.closest('form');

    setInputValues((prevState) => {
      return { ...prevState, [name]: value };
    });

    setInputErrors((prevState) => {
      return { ...prevState, [name]: target.validationMessage };
    });

    if (form) setIsFormValid(form.checkValidity());

    switch (name) {
      case 'postTitle':
        if (target.validity.valueMissing) {
          setErrorMessage(name, errorType.valueMissing.default);
        }
        // if (target.validity.typeMismatch) {
        //   setErrorMessage(name, errorType.typeMismatch.name);
        // }
        break;
    }
  };

  const resetForm = useCallback(() => {
    setInputValues({});
    setInputErrors({});
    setIsFormValid(false);
  }, [setInputValues, setInputErrors, setIsFormValid]);

  return {
    inputValues,
    setInputValues,
    inputErrors,
    isFormValid,
    handleInputChange,
    resetForm,
  };
}
