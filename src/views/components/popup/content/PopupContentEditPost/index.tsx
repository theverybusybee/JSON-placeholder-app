import type { PopupContentEditPostProp } from './types';
import styles from './index.module.scss';
import { Button } from 'views/components/ui-components/Button';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectClickedPostId,
  selectPosts,
  updatePostById,
} from 'slices/postsSlice';
import { Input } from 'views/components/ui-components/Input/Input';
import useFormValidatorHook from 'app/hooks/useFormValidationHook';
import { setIsModalOpenedFalse } from 'slices/modalsSlice';
import { useEffect } from 'react';

export const PopupContentEditPost: React.FC<PopupContentEditPostProp> = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const clickedPostId = useAppSelector(selectClickedPostId);
  const {
    inputValues,
    handleInputChange,
    setInputValues,
    inputErrors,
    isFormValid,
    resetForm,
  } = useFormValidatorHook();

  const post = posts.find((post) => post.id === clickedPostId);

  useEffect(() => {
    const post = posts.find((post) => post.id === clickedPostId);
    if (post) {
      setInputValues({
        ...inputValues,
        postTitle: post.title,
        postContent: post.body,
      });
    }
  }, [clickedPostId, inputValues, posts, setInputValues]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    post &&
      dispatch(
        updatePostById({
          ...post,
          title: inputValues.postTitle,
          body: inputValues.postContent,
        }),
      );
    dispatch(setIsModalOpenedFalse());
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
        disabled={!isFormValid}
        extraClass={styles.submitButton}
        type="submit"
        content="Submit"
      />
    </form>
  );
};
