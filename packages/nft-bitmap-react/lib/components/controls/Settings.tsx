import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Button, FieldError, Form, Input, Label, TextField} from "react-aria-components";
import {ToolIconButton, IconButtonProps} from "../ToolIconButton.tsx";
import {ToolName} from "../Toolbox.tsx";
import {ControlProps} from "./ControlProps.ts";

export const SETTINGS_TOOL_NAME: ToolName = 'settings'
export const SETTINGS_TOOL_TITLE = 'Node Settings'

export function SettingsIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path
                d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
        </svg>
    )
}

export function SettingsIconButton(props: IconButtonProps){
    return (
        <ToolIconButton
            title={SETTINGS_TOOL_TITLE}
            {...props}
        >
            <SettingsIcon/>
        </ToolIconButton>
    )
}

export type Network = 'mainnet' | 'testnet' | 'betanet' | 'sandbox'
export type AlgodSettings = {
    token: string
    baseServer: string
    port: number
}

export type AppSettings = {
    appId?: number
    algod: AlgodSettings
    network: Network
}

export interface SettingsState {
    networks?: {
        [key in Network]: AlgodSettings[]
    }
    apps?: {
        [key in Network]: AppSettings[]
    }
    currentSettings: AppSettings
    setAppSettings: (appId: number, algod: AlgodSettings, network: Network) => void
}

const useSettingsStore = create<SettingsState, [["zustand/persist", SettingsState]]>(
    persist((set) => ({
        appId: 0,
        apps: {
            testnet: [],
            mainnet: [],
            betanet: [],
            sandbox: []

        },
        currentSettings: {
            algod: {
                token: '',
                baseServer: 'http://192.168.1.20',
                port: 4001,
            },
            network: 'sandbox'
        },
        networks: {
            testnet: [{
                token: '',
                baseServer: 'https://testnet-api.algonode.cloud/',
                port: 443,
            }],
            mainnet: [{
                token: '',
                baseServer: 'https://mainnet-api.algonode.cloud/',
                port: 443,
            }],
            betanet: [{
                token: '',
                baseServer: 'https://betanet-api.algonode.cloud/',
                port: 443,
            }],
            sandbox: [{
                token: '',
                baseServer: 'http://localhost',
                port: 4001,
            }]
        },
        setAppSettings: (appId, algod, network) => set({currentSettings: {appId, algod, network}}),
    }), {
        name: 'settings'
    })
)

export function SettingsControl({onClose = ()=>{}}: ControlProps = {onClose: ()=>{}}) {
    const currentSettings = useSettingsStore((state) => state.currentSettings)
    const algodSettings = currentSettings?.algod

    if (!algodSettings) return (
        <div>
            <h3>Node Settings</h3>
            <p>No settings found</p>
            <select name="network" onChange={console.log}>
                <option value="mainnet">mainnet</option>
                <option value="testnet">testnet</option>
                <option value="betanet">betanet</option>
                <option value="sandbox">sandbox</option>
            </select>
        </div>
    )
    return (
        <>
            <button onClick={onClose}>Back</button>
            <h3>Node Settings</h3>
            <Form>
                <TextField name="token" type="text">
                    <Label>Token</Label>
                    <Input value={algodSettings.token}/>
                    <FieldError />
                </TextField>
                <TextField name="server" type="url" isRequired>
                    <Label className="form-label">Server URL</Label>
                    <Input value={algodSettings.baseServer}/>
                    <FieldError className="form-error"/>
                </TextField>
                <TextField name="port" type="number" isRequired>
                    <Label className="form-label">Port</Label>
                    <Input value={algodSettings.port}/>
                    <FieldError className="form-error"/>
                </TextField>
                <Button type="submit">Submit</Button>
            </Form>
            <form>
                <input
                    type="text"
                    name="server"
                    placeholder="Server"
                    value={algodSettings.baseServer}
                    // onChange={(e) => setAlgod({...algodSettings, server: e.target.value})}
                />
                <input
                    type="text"
                    name="token"
                    placeholder="Token"
                    value={algodSettings.token}
                    // onChange={(e) => setAlgod({...algodSettings, token: e.target.value})}
                />
                <input
                    type="number"
                    name="port"
                    placeholder="Port"
                    value={algodSettings.port}
                    // onChange={(e) => setAlgod({...algodSettings, port: parseInt(e.target.value)})}
                />
                <select name="network" onChange={console.log} value={currentSettings?.network}>
                    <option value="mainnet">mainnet</option>
                    <option value="testnet">testnet</option>
                    <option value="betanet">betanet</option>
                    <option value="sandbox">sandbox</option>
                </select>
                <button type="submit">Connect</button>
            </form>
        </>
    )
}
