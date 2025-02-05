import { Meta, StoryObj } from '@storybook/react';
import ButtonAtom, { BUTTON_COLOR, BUTTON_LAYOUT, SIZE } from './ButtonAtom';

const meta: Meta<typeof ButtonAtom> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Atomics/Button',
  component: ButtonAtom,
};
export default meta;

type ButtonAtomStory = StoryObj<typeof ButtonAtom>;

export const Default: ButtonAtomStory = { args: { children: 'Button' } };
export const Small: ButtonAtomStory = { args: { children: 'Button', size: SIZE.SMALL } };
export const Large: ButtonAtomStory = { args: { children: 'Button', size: SIZE.LARGE } };
export const Full: ButtonAtomStory = { args: { children: 'Button', full: true } };

export const Solid: ButtonAtomStory = { args: { children: 'Button', layout: BUTTON_LAYOUT.SOLID } };
export const Outline: ButtonAtomStory = { args: { children: 'Button', layout: BUTTON_LAYOUT.OUTLINE } };

export const Gray: ButtonAtomStory = { args: { children: 'Button', color: BUTTON_COLOR.GRAY } };
