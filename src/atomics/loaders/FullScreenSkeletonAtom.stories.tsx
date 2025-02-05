import { Meta, StoryObj } from '@storybook/react';
import PageContainerAtom from '../layouts/PageContainerAtom';
import FullScreenSkeletonAtom from './FullScreenSkeletonAtom';

const meta: Meta<typeof FullScreenSkeletonAtom> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Atomics/ScreenSkeleton',
  component: FullScreenSkeletonAtom,
};
export default meta;

type FullScreenSkeletonAtomStory = StoryObj<typeof FullScreenSkeletonAtom>;

const Template: FullScreenSkeletonAtomStory = {
  render: (args) => {
    return (
      <PageContainerAtom full>
        <FullScreenSkeletonAtom />
      </PageContainerAtom>
    );
  },
};

export const Default: FullScreenSkeletonAtomStory = {
  ...Template,
};
