import { Meta, StoryObj } from '@storybook/react';
import PageContainerAtom from '../layouts/PageContainerAtom';

const meta: Meta<typeof PageContainerAtom> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Atomics/layout',
  component: PageContainerAtom,
};
export default meta;

type PageContainerAtomStory = StoryObj<typeof PageContainerAtom>;

const Template: PageContainerAtomStory = {
  render: (args) => {
    return (
      <PageContainerAtom className='bg-borderColor'>
        <div className='h-screen w-full'>content</div>
      </PageContainerAtom>
    );
  },
};

const FullPageTemplate: PageContainerAtomStory = {
  render: (args) => {
    return (
      <PageContainerAtom full className='bg-borderColor'>
        <div className='h-screen w-full'>content</div>
      </PageContainerAtom>
    );
  },
};

export const Default: PageContainerAtomStory = {
  ...Template,
};

export const FullPage: PageContainerAtomStory = {
  ...FullPageTemplate,
};
