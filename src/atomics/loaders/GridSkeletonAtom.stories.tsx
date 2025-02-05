import { Meta, StoryObj } from '@storybook/react';
import PageContainerAtom from '../layouts/PageContainerAtom';
import GridSkeletonAtom from './GridSkeletonAtom';

const meta: Meta<typeof GridSkeletonAtom> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Atomics/GridSkeleton',
  component: GridSkeletonAtom,
};
export default meta;

type GridSkeletonAtomAtomStory = StoryObj<typeof GridSkeletonAtom>;

const Template: GridSkeletonAtomAtomStory = {
  render: (args) => {
    return (
      <PageContainerAtom>
        <GridSkeletonAtom />
      </PageContainerAtom>
    );
  },
};

export const Default: GridSkeletonAtomAtomStory = {
  ...Template,
};
