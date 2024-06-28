import {ToolIconButton, IconButtonProps} from "../ToolIconButton.tsx";
import {Color} from "@nft-bitmap/kit/colors";
import {AtomicTransactionComposer} from "algosdk";
import {NftBitmapClient} from "@nft-bitmap/kit/client";
import type {TransactionSignerAccount} from "@algorandfoundation/algokit-utils/types/account";
import {Transaction} from "algosdk";
import {ControlProps} from "./ControlProps.ts";
import {BitmapViewer} from "../BitmapViewer.tsx";

export const DEPLOY_TOOL_NAME = 'deploy'
export const DEPLOY_TOOL_TITLE = 'Deploy'

export function DeployIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path
                d="m226-559 78 33q14-28 29-54t33-52l-56-11-84 84Zm142 83 114 113q42-16 90-49t90-75q70-70 109.5-155.5T806-800q-72-5-158 34.5T492-656q-42 42-75 90t-49 90Zm178-65q-23-23-23-56.5t23-56.5q23-23 57-23t57 23q23 23 23 56.5T660-541q-23 23-57 23t-57-23Zm19 321 84-84-11-56q-26 18-52 32.5T532-299l33 79Zm313-653q19 121-23.5 235.5T708-419l20 99q4 20-2 39t-20 33L538-80l-84-197-171-171-197-84 167-168q14-14 33.5-20t39.5-2l99 20q104-104 218-147t235-24ZM157-321q35-35 85.5-35.5T328-322q35 35 34.5 85.5T327-151q-25 25-83.5 43T82-76q14-103 32-161.5t43-83.5Zm57 56q-10 10-20 36.5T180-175q27-4 53.5-13.5T270-208q12-12 13-29t-11-29q-12-12-29-11.5T214-265Z"/>
        </svg>
    )
}

export function DeployIconButton(props: Omit<IconButtonProps, 'name'>){
    return (
        <ToolIconButton
            name={DEPLOY_TOOL_NAME}
            title={DEPLOY_TOOL_TITLE}
            {...props}
        >
            <DeployIcon/>
        </ToolIconButton>
    )
}

export type ApplicationDeployment = {
    type: 'application'
    name?: string
    description?: string
    appId: number
    image: Color[][]
}
export type NFTDeployment = {
    type: 'nft'
    name?: string
    description?: string
    asaId: number
    url: URL
    image: Color[][]
}
export type DeployControlProps = ControlProps & {
    onDeploy: (deployment: ApplicationDeployment | NFTDeployment) => void
}

export function DeployControl({onClose, onDeploy, image, manager}: DeployControlProps){
    if(!image || !manager) return null
    return (
        <div>
            <button onClick={onClose}>Back</button>
            <h3>{DEPLOY_TOOL_TITLE}</h3>
            <BitmapViewer image={image} style={{height: 250}}/>
            <input placeholder="Name"/>
            <input placeholder="Description"/>
            <button onClick={async () => {
                const nftClient = new NftBitmapClient({
                    resolveBy: "id",
                    sender: {signer: manager.transactionSigner, addr: manager.activeAddress} as TransactionSignerAccount,
                    id: 0
                }, manager.algodClient)
                // Deploy the Image
                console.log('Deploying Image')
                const enc = new TextEncoder()
                // TODO: update global AppID
                const result = await nftClient.create.createApplication({})
                const txns = image.map((row)=>enc.encode(row.map((c)=>c.key).join(''))).map((r, i)=>{
                    return nftClient.placeRow([i, r as unknown as string], {
                        sendParams:{
                            skipSending: true,
                            populateAppCallResources: false,
                        }
                    }).then((r)=>r.transaction) as Promise<Transaction>
                })

                console.log(result)
                // console.log(result)
                // const txns: Promise<Transaction>[] = []
                await Promise.all(txns).then(async _txns=>{
                    for(let y = 0; y < _txns.length; y+=16){
                        const atc = new AtomicTransactionComposer();
                        _txns.slice(y, y+16).forEach((txn)=>{
                            atc.addTransaction({txn, signer: manager.transactionSigner})
                        })
                        await atc.execute(manager.algodClient, 4)
                    }
                })
                onDeploy({
                    type: 'application',
                    appId: result.appId as number,
                    image,
                })
            }}>Application
            </button>
            <button onClick={() => {
                // Deploy the Image
                console.log('Deploying Image')
                onDeploy({
                    type: 'nft',
                    asaId: 1,
                    url: new URL('https://txnlab.com'),
                    image
                })
            }}>NFT
            </button>
        </div>
    )
}
