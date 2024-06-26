import {CSSProperties, PropsWithChildren, useMemo, useState} from "react";
import {getColorPaletteBitmap, type Color} from "nft-bitmap-kit/colors";
import {UploadIconButton, UploadImageControl} from "./controls/Upload.tsx";
import {SettingsControl, SettingsIconButton} from "./controls/Settings.tsx";
import {SaveControl, SaveIconButton} from "./controls/Save.tsx";
import {OpenControl, OpenIconButton} from "./controls/Open.tsx";
import {WalletControl, WalletIconButton} from "./controls/Wallet.tsx";
import {WalletManager} from "@txnlab/use-wallet-react";
import {HelpControl, HelpIconButton} from "./controls/Help.tsx";
import {ModeIconButton} from "./controls/Mode.tsx";
import {PointIconButton} from "./controls/Point.tsx";
import {PaintIconButton} from "./controls/Paint.tsx";
import {BucketIconButton, BUCKET_TOOL_NAME} from "./controls/Bucket.tsx";
import {WipeIconButton} from "./controls/Wipe.tsx";
import {ApplicationDeployment, DeployControl, DeployIconButton, NFTDeployment} from "./controls/Deploy.tsx";
import {BitmapViewer} from "./BitmapViewer.tsx";

export type ToolName = 'point' | 'paint' | 'bucket' | 'wipe' | 'upload' | 'wallet' | 'deploy' | 'settings' | 'save' | 'open' | 'help' | 'mode'

export type ToolboxContainerProps = PropsWithChildren & {
    className?: string,
    color?: Color,
    speed?: string,
    style?: CSSProperties,
}

export function ToolboxContainer({
                                     children,
                                     className = "nft-bitmap-controls",
                                     color,
                                     style,
                                     speed = '0.5s'
                                 }: ToolboxContainerProps) {
    const textColor = color?.name === "Black" ? "white" : "black"
    return (
        <div className={className} style={{
            transition: `background-color ${speed} linear, color ${speed} linear, border ${speed} linear`,
            top: '1rem',
            right: '1rem',
            width: 175,
            maxHeight: 'calc(100% - 5rem)',
            padding: '1rem',
            borderRadius: '1rem',
            border: `5px solid ${textColor}`,
            position: 'fixed',
            color: textColor,
            overflowY: 'auto',
            overflowX: 'hidden',
            backgroundColor: color?.hex ? color.hex : 'white',
            ...style,
        }}>
            {children}
        </div>
    )
}

type ToolbarProps = {
    image: Color[][],
    manager: WalletManager,
    mode?: 'view' | 'edit',
    activeTool?: ToolName,
    activeColor?: Color,
    onColorChange?: (color?: Color) => void
    onColorHover?: (color: Color | null) => void
    onToolChange?: (tool: ToolName) => void
    onDeploy?: (deployment: ApplicationDeployment | NFTDeployment) => void
    onToggle?: () => void
    onClear?: () => void,
    onOpen?: (image: Color[][]) => void,
    onConnect?: () => void,
}

export function Toolbox({
                            manager,
                            image,
                            mode = 'edit',
                            activeColor,
                            activeTool,
                            onColorHover = () => {
                            },
                            onColorChange = () => {
                            },
                            onToolChange = () => {
                            },
                            onToggle = () => {
                            },
                            onOpen = () =>{

                            },
    onDeploy = () => {},
                        }: ToolbarProps) {
    const [palette] = useState<Color[][]>(() => getColorPaletteBitmap())
    const position = useMemo(() => {
        return palette.map((row, y) => row.map((color, x) => ({
            x,
            y,
            color
        }))).flat().find(({color: _color}) => _color.name === activeColor?.name)
    }, [activeColor?.name, palette])

    // Handle Tool Changes
    if (activeTool === 'upload') return <ToolboxContainer><UploadImageControl onChange={console.log}
                                                                              onClose={() => onToolChange('point')}/></ToolboxContainer>
    if (activeTool === 'wallet') return <ToolboxContainer style={{width: 300}}><WalletControl manager={manager}
        onClose={() => onToolChange('point')}/></ToolboxContainer>
    if (activeTool === 'deploy') return <ToolboxContainer><DeployControl
        manager={manager}
        image={image}
        onDeploy={onDeploy}
        onClose={() => onToolChange('point')}/></ToolboxContainer>
    if (activeTool === 'settings') return <ToolboxContainer><SettingsControl
        onClose={() => onToolChange('point')}/></ToolboxContainer>
    if (activeTool === 'save') return <ToolboxContainer><SaveControl image={image}
        onClose={() => onToolChange('point')}/></ToolboxContainer>
    if(activeTool === 'open') return <ToolboxContainer><OpenControl onOpen={onOpen} onClose={() => onToolChange('point')}/></ToolboxContainer>
    if(activeTool === 'help') return <ToolboxContainer style={{width: 300}}><HelpControl onClose={() => onToolChange('point')}/></ToolboxContainer>

    return (
        <>
        {!activeTool && <ToolboxContainer style={{
            right: "calc(5rem + 175px)",
            top: "2rem",
            width: 45,
        }}>
            <div>Select a tool</div>
        </ToolboxContainer>}

        {!activeColor && <ToolboxContainer style={{
                right: "calc(5rem + 175px)",
                top: 168,
                width: 45,
                borderColor: "red"
            }}>
                <div>Select a Color</div>
        </ToolboxContainer>}
        <ToolboxContainer color={activeColor}>
            <div className={`toolbox ${activeColor ? 'has-color' : 'no-color'}`}
                 style={{display: "flex", boxSizing: "border-box", flexWrap: "wrap"}}>
                <PointIconButton
                    // disabled={activeTool === 'point'}
                    onClick={() => onToolChange("point")}
                />
                <PaintIconButton
                    disabled={mode !== 'edit'}
                    onClick={() => onToolChange("paint")}
                />
                <BucketIconButton
                    disabled={mode !== 'edit'}
                    onClick={() => onToolChange(BUCKET_TOOL_NAME)}
                />
                <WipeIconButton
                    disabled={mode !== 'edit'}
                    onClick={() => {
                        onToolChange("wipe")
                    }}
                />
                <UploadIconButton
                    disabled
                    title="Image Upload: Coming Soon"
                    onClick={() => onToolChange('upload')}
                />
                <SaveIconButton
                    onClick={() => onToolChange('save')}
                />

                <OpenIconButton
                    disabled={mode !== 'edit'}
                    onClick={() => onToolChange('open')}
                />
                <ModeIconButton
                    mode={mode}
                    onClick={onToggle}
                />
                <HelpIconButton
                    onClick={() => onToolChange('help')}
                />

                <DeployIconButton
                    onClick={() => onToolChange('deploy')}
                />
                <WalletIconButton
                    onClick={() => onToolChange('wallet')}
                />
                <SettingsIconButton
                    disabled={true}
                    onClick={() => onToolChange("settings")}
                />
                <BitmapViewer
                    className={`color-selector ${activeColor ? 'has-color' : 'no-color'}`}
                    style={{height: 87}}
                    activeCell={position}
                    width={8}
                    height={4}
                    image={palette}
                    onCellEnter={(_, _color) => onColorHover(_color)}
                    onBitmapLeave={() => {
                        onColorHover(null)
                    }}
                    onCellClick={(_, _color) => {
                        if(_color.hex === activeColor?.hex) {
                            onColorChange()
                        } else {
                            onColorChange(_color)
                        }
                    }}/>

            </div>
        </ToolboxContainer>
        </>
    )
}
