import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ButtonAtom from '../buttons/ButtonAtom';
import ModalAtom from './ModalAtom';

const meta: Meta<typeof ModalAtom> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Atomics/Modal',
  component: ModalAtom,
};
export default meta;

type ModalAtomStory = StoryObj<typeof ModalAtom>;
const Template: ModalAtomStory = {
  render: (args) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleCloseModal = () => {
      setOpen(false);
    };

    const handleOpenModal = () => {
      setOpen(true);
    };

    return (
      <>
        <ButtonAtom onClick={handleOpenModal}>모달</ButtonAtom>
        {open && <ModalAtom onCloseModal={handleCloseModal}>{args.children}</ModalAtom>}
      </>
    );
  },
};

export const Default = {
  ...Template,
  args: {
    children: <div className='p-10 text-borderColor'>모달 내용입니다.</div>,
  },
};
