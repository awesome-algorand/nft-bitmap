import type {Meta, StoryObj} from '@storybook/react';
import { fn } from '@storybook/test';
import { PaintIconButton as Component } from './Paint';

const meta: Meta<typeof Component> = {
    title: 'Controls',
};

export default meta;
type Story = StoryObj<typeof Component>;

export const PaintButton: Story = {
    args: {
        onToolClick: fn(),
    },
    render: (args)=><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 1rem)', width: 400, margin: 'auto'}}><Component {...args}></Component></div>
};
