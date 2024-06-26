import {PointIconButton} from "./Point.tsx";
import {PaintIconButton} from "./Paint.tsx";
import {HTMLAttributes} from "react";
import {ToolIconButton} from "../ToolIconButton.tsx";
import {BUCKET_TOOL_TITLE, BucketIconButton} from "./Bucket.tsx";
import {WipeIconButton} from "./Wipe.tsx";
import {UploadIconButton} from "./Upload.tsx";
import {SaveIconButton} from "./Save.tsx";
import {OpenIconButton} from "./Open.tsx";
import {ModeIconButton} from "./Mode.tsx";
import {DeployIconButton} from "./Deploy.tsx";
import {WalletIconButton} from "./Wallet.tsx";
import {SettingsIconButton} from "./Settings.tsx";
import {ToolName} from "../Toolbox.tsx";
import type {ControlProps} from "./ControlProps.ts";

export const HELP_TOOL_NAME: ToolName = 'help'
export const HELP_TOOL_TITLE = 'Help'

export function HelpIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path
                d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>
    )
}
export function HelpIconButton(props: HTMLAttributes<HTMLButtonElement>){
    return (
        <ToolIconButton
            title={HELP_TOOL_TITLE}
            {...props}
        >
            <HelpIcon/>
        </ToolIconButton>
    )
}

export function HelpControl({onClose}: ControlProps) {
    return (
        <>
            <button onClick={onClose}>Back</button>
            <h2>Help</h2>
            <ul>
                <li><PointIconButton/>Change the color of a single Cell</li>
                <li><PaintIconButton/>Click and drag to paint multiple Cells</li>
                <li><BucketIconButton/><strong>{BUCKET_TOOL_TITLE}</strong> Click to fill all adjacent Cells</li>
                <li><WipeIconButton/>Click to replace all Cells with a Color</li>
                <li><UploadIconButton/>Upload an image and down sample</li>
                <li><SaveIconButton/>Save an Image</li>
                <li><OpenIconButton/>Open an Image</li>
                <li><ModeIconButton mode="edit"/>Edit on chain</li>
                <li><ModeIconButton mode="view"/>Edit off chain</li>
                <li><HelpIconButton/>Opens this message</li>
                <li><DeployIconButton/>Deploy your own contract</li>
                <li><WalletIconButton/>Manage your wallet connection</li>
                <li><SettingsIconButton/>Configure your node</li>

            </ul>
        </>
    )
}
