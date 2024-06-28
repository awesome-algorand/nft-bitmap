import {beforeEach, describe, it, Mock, vi, expect} from 'vitest'
import {fireEvent, render, screen} from '@testing-library/react'
import { ToolIconButton } from './ToolIconButton'
// eslint-disable-next-line
var noOp: Mock;
vi.mock('@/controllers', ()=>{
    const fn = vi.fn()
    noOp = fn;
    return {NoOp: fn}
})
describe('ToolIconButton', () => {
    let onToolClick: Mock
    beforeEach(()=>{
        onToolClick = vi.fn()
    })
    it('renders a ToolIconButton component', () => {
        render(<ToolIconButton name="wipe" onToolClick={onToolClick}/>)
        screen.getAllByRole('button').forEach((button) => {
            fireEvent.click(button)
            expect(onToolClick).toHaveBeenCalledWith("wipe")
        })
    })
    it('renders a ToolIconButton component with NoOp', () => {
        render(<ToolIconButton name="wipe"/>)
        screen.getAllByRole('button').forEach((button) => {
            fireEvent.click(button)
            expect(noOp).toHaveBeenCalledTimes(1)
        })
    })
    it('renders a disabled ToolIconButton component', () => {
        render(<ToolIconButton name="wipe" onToolClick={onToolClick} disabled/>)
        screen.getAllByRole('button').forEach((button) => {
            fireEvent.click(button)
            expect(onToolClick).toHaveBeenCalledTimes(0)
        })
    })
})
