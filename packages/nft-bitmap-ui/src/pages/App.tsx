import {useEffect, useMemo, useState, MouseEvent as ReactMouseEvent} from "react";
import {Color, COLORS, fillColor} from "nft-bitmap-kit/colors";
import {type Position, Toolbox, Details, BitmapViewer} from "nft-bitmap-react/components";
import {useNFTClient, useLiveImage, useTransactionSelector} from "nft-bitmap-react/hooks"
import {useEditorImage} from "nft-bitmap-react/stores";
import {useMove} from "react-aria";
import {useWallet, WalletManager} from "@txnlab/use-wallet-react";
import {useNavigate, useParams} from "react-router-dom";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {TetrisBackground} from "@/layout/TetrisBackground.tsx";
import {useToolParam} from "@/hooks/useToolParam.ts";
import {useColorParam} from "@/hooks/useColorParam.ts";

const DEFAULT_IMAGE_APPIDS: {[k: string]: number} = {
    'mainnet': 1507,
    'testnet': 690224515,
    'betanet': 1507,
    'localnet': 0,
}

export function App(){
    const manager = useWallet() as unknown as WalletManager
    const navigate = useNavigate()
    const params = useParams()
    const activeAppId = useMemo(()=>{
        if(params.id) return parseInt(params.id)
        return DEFAULT_IMAGE_APPIDS[manager.activeNetwork]
        },
        [manager.activeNetwork, params.id])

    const nftClient = useNFTClient(manager, activeAppId)
    const viewImage = useLiveImage(manager.algodClient, activeAppId)

    // Watch for application transactions
    const lastRound = useTransactionSelector((txns)=>{
        return txns.find((state)=>state.txn.apid === activeAppId) !== undefined
    })

    useEffect(() => {
        if(!viewImage.data) return
        if(lastRound){
            viewImage.refetch()
        }
    }, [lastRound, viewImage]);
    // Editor or Viewer Mode
    const [mode, setMode] = useState<'view' | 'edit'>('view')
    // Get the Active Tool from the URL
    const [tool, setTool] = useToolParam()

    // Current Color and Position below the Mouse or Touch Event
    const [hoverColor, setHoverColor] = useState<Color>(COLORS[0])
    const [hoverPosition, setHoverPosition] = useState({x: 0, y: 0})

    // Color that is currently selected for painting
    const [selectedColor, setSelectedColor] = useColorParam()

    const editorImage = useEditorImage(state => state.image)
    const clearEditorImage = useEditorImage(state => state.clearImage)
    const updateEditorCell = useEditorImage(state => state.setCell)
    const setEditorImage = useEditorImage(state => state.setImage)
    // Is the Details Component Open
    const [detailsVisible, setDetailsVisible] = useState(false)


    const selectedImage = useMemo(() => mode === 'view' ? viewImage.data : editorImage, [mode, viewImage.data, editorImage])
    const clearImage = clearEditorImage


    useEffect(() => {
        document.title = `Bitmap ${mode === 'view' ? 'Viewer' : 'Editor'}`
    }, [mode]);

    const [isMoving, setIsMoving] = useState(false)
    const { moveProps } = useMove({
        onMoveStart() {
            setIsMoving(true)
        },
        onMoveEnd() {
            setIsMoving(false)
        }
    });


    function handleToggle(){
        setMode(mode === 'view' ? 'edit' : 'view')
        // navigate(`/${mode === 'view' ? 'edit' : 'view'}/${activeTool}${selectedColor ? `?color=${selectedColor.hex}` : ''}`, {replace: true})
    }

    function handleCellClick(e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, color: Color, position: Position){

        if(mode === 'view' && selectedColor) {
            if(!manager.activeAddress && tool !== 'wallet') {
                setTool('wallet')
            }
            if(!manager.activeAddress) return
            switch (tool) {
                case 'point': {
                    if (selectedColor.hex === color.hex) return
                    const el = e.target as HTMLButtonElement
                    el.classList.add('loading')
                    el.setAttribute('aria-busy', 'true')
                    el.setAttribute('disabled', 'true')
                    nftClient?.place([position.y, position.x, COLORS.findIndex((c) => c.hex === selectedColor.hex) + 1]).then(() => {
                        console.log('placed pixel')
                        el.classList.remove('loading')
                        el.setAttribute('aria-busy', 'false')
                        el.removeAttribute('disabled')
                        return viewImage.refetch()
                    })
                    break;
                }
                case 'paint':
                    break;
                case 'bucket':
                    break;
                case 'wipe':
                    break;
                default:
                    break;
            }
        }
        if(mode === 'edit' && selectedColor){
            switch (tool) {
                case 'point' || 'paint':
                    if(selectedColor?.hex === color.hex) return
                    updateEditorCell(position, selectedColor)
                    break;
                case 'paint':
                    if(selectedColor?.hex === color.hex) return
                    updateEditorCell(position, selectedColor)
                    break;
                case 'bucket':
                    setEditorImage(fillColor(editorImage, selectedColor, position))
                    break;
                case 'wipe':
                    clearImage(selectedColor)
                    break;
                default:
                    break;
            }

        }
    }
    function handleCellEnter(_: ReactMouseEvent<HTMLButtonElement, MouseEvent>, color: Color, position: Position){
        if(!detailsVisible) setDetailsVisible(true)
        setHoverColor(color)
        setHoverPosition(position)
        if(tool === 'paint' && typeof selectedColor !== 'undefined' && isMoving){
            if(selectedColor.hex !== color.hex){
                updateEditorCell(position, selectedColor)
            }
        }
    }
    function handleControlColorHover(color: Color | null){
        if(color === null) {
            setDetailsVisible(false)
            return
        }
        setHoverColor(color)
        if(!detailsVisible) setDetailsVisible(true)
    }
    if(viewImage.isError) {
        if(mode !== 'edit') {
            setMode('edit')
        }
    }
    if(viewImage.isLoading) return <div>Loading....</div>
    return (
        <>
            <TetrisBackground/>
            <BitmapViewer
                className={`live ${tool} ${typeof selectedColor === 'undefined' ? 'no-color' : 'has-color'}`}
                style={{
                    '--selected-color': selectedColor?.hex,
                }}
                image={selectedImage}
                onBitmapLeave={() => {
                    if (detailsVisible) setDetailsVisible(false)
                }}
                onCellEnter={handleCellEnter}
                onCellClick={handleCellClick}
                {...moveProps}
            />
            <Toolbox
                manager={manager}
                image={selectedImage}
                activeTool={tool}
                onOpen={setEditorImage}
                onToolChange={setTool}
                onColorHover={handleControlColorHover}
                activeColor={selectedColor}
                onClear={() => clearImage(selectedColor)}
                onColorChange={setSelectedColor}
                onToggle={handleToggle} mode={mode}
                onDeploy={(deployment) => {
                    if(deployment.type === 'application') {
                        navigate(`/image/${deployment.appId}`)
                    }
                }}
            />
            <Details visible={detailsVisible} color={hoverColor} position={hoverPosition}/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </>
    )
}
