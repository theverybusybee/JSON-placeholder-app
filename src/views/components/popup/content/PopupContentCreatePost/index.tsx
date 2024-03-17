import type { PopupContentCreatePostProp } from './types';
import styles from './index.module.scss';
import { Button } from 'views/components/ui-components/Button';

import { useAppDispatch } from 'app/hooks';
import { postPostAsync } from 'slices/postsSlice';
import { toggleIsOpened } from 'slices/modalsSlice';
import { Input } from 'views/components/ui-components/Input/Input';
import useFormValidatorHook from 'app/hooks/useFormValidationHook';
import { useEffect } from 'react';

export const PopupContentCreatePost: React.FC<
  PopupContentCreatePostProp
> = () => {
  const dispatch = useAppDispatch();

  const {
    inputValues,
    handleInputChange,
    inputErrors,
    isFormValid,
    resetForm,
  } = useFormValidatorHook();

  useEffect(() => {
    resetForm();
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      postPostAsync({
        title: inputValues.postTitle.trim(),
        content: inputValues.postContent.trim(),
      }),
    );
    dispatch(toggleIsOpened());
    resetForm();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <h3 className={styles.inputTitle}>Title</h3>
        <Input
          minLength={2}
          maxLength={70}
          name="postTitle"
          type="input"
          placeholder="Type post title"
          value={inputValues.postTitle ? inputValues.postTitle : ''}
          onChange={handleInputChange}
          isRequired={true}
          validationContent={inputErrors.postTitle}
        />
      </div>
      <div className={styles.inputContainer}>
        <h3 className={styles.inputTitle}>Content</h3>
        <Input
          minLength={5}
          maxLength={280}
          name="postContent"
          type="textarea"
          placeholder="Type post content"
          value={inputValues.postContent ? inputValues.postContent : ''}
          onChange={handleInputChange}
          isRequired={true}
          validationContent={inputErrors.postContent}
        />
      </div>
      <Button
        isDisabled={!isFormValid}
        extraClass={styles.submitButton}
        type="submit"
        content="Submit"
      />
    </form>
  );
};
