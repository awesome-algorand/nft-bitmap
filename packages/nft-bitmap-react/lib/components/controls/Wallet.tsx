import {ToolIconButton, IconButtonProps} from "../ToolIconButton.tsx";
import {ToolName} from "../Toolbox.tsx";
import {WalletAccount, WalletManager} from "@txnlab/use-wallet-react";

export const WALLET_TOOL_NAME: ToolName = 'wallet'
export const WALLET_TOOL_TITLE = 'Wallet Settings'

export function WalletIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path
                d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z"/>
        </svg>
    )
}
export function DisconnectIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path
                d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>
    )
}

export function WalletIconButton(props: IconButtonProps) {
    return (
        <ToolIconButton
            title={WALLET_TOOL_TITLE}
            {...props}
        >
            <WalletIcon/>
        </ToolIconButton>
    )
}

function toDisplayString(account: WalletAccount): string {
    return `${account.address.slice(0, 4)}...${account.address.slice(-4)}`
}

export type WalletControlProps = {
    manager: WalletManager,
    activeAddress?: string,
    onClose: () => void
}

export function WalletControl({onClose, manager}: WalletControlProps) {
    return (
        <div>

            <button onClick={onClose}>Back</button>
            <h3>Wallet</h3>
            {manager.wallets.map((wallet) => (
                <div className={wallet.isActive ? "active" : ""} key={wallet.id}
                     style={{backgroundColor: "var(--selected-color)", padding: 5}}>
                    <div style={{borderRadius: 100, backgroundColor: "black", display: 'flex', height: 55}}>
                        <img onClick={() => {
                            wallet.setActive()
                        }} src={wallet.metadata.icon} style={{borderRadius: 100, backgroundColor: "black"}}/>


                        {wallet.isConnected &&
                            <select style={{textAlign: 'center', borderRadius: "100px 0 0 100px", flex: 1}}
                                    onChange={(e) => wallet.setActiveAccount(e.target.value)}>
                                {wallet.accounts.map((account) => (
                                    <option key={account.address} value={account.address}>
                                        {toDisplayString(account)}
                                    </option>
                                ))}
                            </select>}
                        {wallet.isConnected && !wallet.isActive &&
                            <button style={{color: "green"}} onClick={() => wallet.setActive()}>Activate</button>}
                        {!wallet.isConnected && <button style={{height: "100%", borderRadius: 100, flex: 1}}
                                                        onClick={() => wallet.connect()}>Connect</button>}
                        {wallet.isConnected &&
                            <button style={{borderRadius: "0 100px 100px 0"}} onClick={() => wallet.disconnect()}>
                                <DisconnectIcon/></button>}
                    </div>
                </div>
            ))}
        </div>
    )
}
