import type {Meta, StoryObj} from '@storybook/react';
import { fn } from '@storybook/test';
import { ToolIconButton as Component } from './ToolIconButton';

const meta: Meta<typeof Component> = {
    component: Component,
    title: 'Controls',
    args: {
        onToolClick: fn(),
    }
};

export default meta;
type Story = StoryObj<typeof Component>;

export const IconButton: Story = {
    render: (args)=><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 1rem)', width: 400, margin: 'auto'}}><Component {...args}>🚀</Component></div>
};

