import { useState, ChangeEvent, useCallback, useContext } from 'react';

import style from './PhoneInputForm.module.scss';

import { ModalContext } from 'components/Modal/ModalProvider';
import { SuperButton } from 'components/SuperButton';
import { SuperInputText } from 'components/SuperInputText';
import { ReturnUseModalType } from 'hooks/useModal';
import { useAppDispatch } from 'store';
import { addContact } from 'store/reducers/contacts';
import { ReturnComponentType } from 'types';

export const PhoneInputForm = (): ReturnComponentType => {
  const [value, setValue] = useState<string>('');
  const { closeModal } = useContext<ReturnUseModalType>(ModalContext);

  const dispatch = useAppDispatch();

  const onInputTypePhoneChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.currentTarget.value);
  }, []);

  const onAddUserToContactsButtonClick = useCallback(() => {
    dispatch(addContact({ userPhone: value }));
    closeModal();
  }, [dispatch, value, closeModal]);

  return (
    <div className={style.formWrapper}>
      <SuperInputText type="tel" value={value} onChange={onInputTypePhoneChange} />
      <SuperButton onClick={onAddUserToContactsButtonClick}>
        Add user to contacts
      </SuperButton>
    </div>
  );
};
