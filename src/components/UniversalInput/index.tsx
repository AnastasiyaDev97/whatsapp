import { FC, memo, useState } from 'react';

import styles from './UniversalInput.module.scss';

import { InputType, ReturnComponentType } from 'types';
import { SuperInputText } from 'components/SuperInputText';
import { FieldInputProps } from 'formik';

type UniversalInputPropsType = {
  validationErr: string;
  formikProps: FieldInputProps<any>;
  type?: InputType;
  placeholder?: string;
};

export const UniversalInput: FC<UniversalInputPropsType> = memo(
  ({
    validationErr,
    formikProps,
    placeholder,
    type,
  }: UniversalInputPropsType): ReturnComponentType => {
    const [inputType, setInputType] = useState<InputType>(type || 'text');

    const onSpanToggleShowPasswordClick = (): void => {
      setInputType(state => {
        return state === 'password' ? 'text' : 'password';
      });
    };

    return (
      <div className={styles.inputWrapper}>
        <SuperInputText
          className={styles.input}
          placeholder={placeholder}
          {...formikProps}
          type={inputType}
        />
        {type === 'password' && (
          <span
            className={styles.togglePassBtn}
            onClick={onSpanToggleShowPasswordClick}
          />
        )}
        <div className={styles.error}>{validationErr}</div>
      </div>
    );
  },
);
