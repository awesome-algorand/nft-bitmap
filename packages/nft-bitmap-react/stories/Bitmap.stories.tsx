import type {Meta, StoryObj} from '@storybook/react';
import { fn } from '@storybook/test';
import { Bitmap as Component } from '../lib/components/Bitmap';
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

export const Bitmap: Story = {
    render: (args)=><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 1rem)', width: 400, margin: 'auto'}}><Component {...args}/></div>
};
