import type {Meta, StoryObj} from '@storybook/react';
import { fn } from '@storybook/test';
import { Cell as Component } from '../lib/components/Cell';

const meta: Meta<typeof Component> = {
    component: Component,
    title: "Image",
    args: {
        onClick: fn(),
        onMouseEnter: fn(),
        onMouseLeave: fn(),
        cellColor: {name: "red", hex: "#ff0000"},
        cellSize: 100,
        position: {y: 0, x: 0},
    }
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Cell: Story = {
    render: (args)=><div style={{ height: 'calc(100vh - 1rem)', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Component {...args}/></div>
};
