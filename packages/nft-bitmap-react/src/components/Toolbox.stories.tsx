import type {Meta, StoryObj} from '@storybook/react';
import { fn } from '@storybook/test';
import { Toolbox as Component } from './Toolbox';

const meta: Meta<typeof Component> = {
    component: Component,
    title: 'Toolbox',
    args: {
        onToolChange: fn(),
        onDeploy: fn(),
        onToggle: fn(),
        onOpen: fn(),
        onColorChange: fn(),
        // activeTool: "point",
    }
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Inactive: Story = {
    render: (args)=><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 1rem)', width: 400, margin: 'auto'}}><Component {...args}/></div>
};

export const ActiveTool: Story = {
    args: { activeTool: "point"},
    render: (args)=><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 1rem)', width: 400, margin: 'auto'}}><Component {...args}/></div>
}

export const ActiveColor: Story = {
    args: { activeColor: {name: "red", hex: "#ff0000"}},
    render: (args)=><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 1rem)', width: 400, margin: 'auto'}}><Component {...args}/></div>
}

export const ActiveToolAndColor: Story = {
    args: { activeTool: "point", activeColor: {name: "red", hex: "#ff0000"}},
    render: (args)=><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 1rem)', width: 400, margin: 'auto'}}><Component {...args}/></div>
}
