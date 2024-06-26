import {WalletAccount} from "@txnlab/use-wallet-react";

export function toDisplayString(account: WalletAccount): string {
    return account.name ? account.name : `${account.address.slice(0, 4)}...${account.address.slice(-4)}`
}
