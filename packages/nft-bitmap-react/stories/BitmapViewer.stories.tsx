import type {Meta, StoryObj} from '@storybook/react';
import { fn } from '@storybook/test';
import { BitmapViewer as Component } from '../lib/components/BitmapViewer';
import image from './fixtures/image';
const meta: Meta<typeof Component> = {
    component: Component,
    title: 'Image',
    args: {
        image,
        onCellClick: fn(),
        onBitmapEnter: fn(),
        onBitmapLeave: fn(),
        cellSize: 10,
    }
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Viewer: Story = {
    render: (args)=><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 2rem)', margin: 'auto'}}><Component {...args}/></div>
};
