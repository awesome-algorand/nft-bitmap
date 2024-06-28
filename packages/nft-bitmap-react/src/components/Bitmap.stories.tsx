import type {Meta, StoryObj} from '@storybook/react';
import {fn, userEvent, within, expect} from '@storybook/test';
import { Bitmap as Component } from './Bitmap';
import image from './__fixtures__/image';
const meta: Meta<typeof Component> = {
    component: Component,
    title: 'Image',
    args: {
        image,
        onCellClick: fn(),
        onBitmapEnter: fn(),
        onBitmapLeave: fn(),
        cellSize: 10,
    },
    // Integration Testing
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getAllByRole('img')[0]);
        await expect(args.onCellClick).toHaveBeenCalled();
    },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Bitmap: Story = {
    render: (args)=><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 1rem)', width: 400, margin: 'auto'}}><Component {...args}/></div>
};
