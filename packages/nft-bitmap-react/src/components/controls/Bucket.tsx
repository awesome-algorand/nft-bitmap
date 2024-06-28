import {ToolIconButton, IconButtonProps} from "../ToolIconButton.tsx";
import {ToolName} from "../Toolbox.tsx";

export const BUCKET_TOOL_NAME: ToolName = 'bucket'
export const BUCKET_TOOL_TITLE = 'Paint Bucket'

export function BucketIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path
                d="M346-140 100-386q-10-10-15-22t-5-25q0-13 5-25t15-22l230-229-106-106 62-65 400 400q10 10 14.5 22t4.5 25q0 13-4.5 25T686-386L440-140q-10 10-22 15t-25 5q-13 0-25-5t-22-15Zm47-506L179-432h428L393-646Zm399 526q-36 0-61-25.5T706-208q0-27 13.5-51t30.5-47l42-54 44 54q16 23 30 47t14 51q0 37-26 62.5T792-120Z"/>
        </svg>
    )
}

export function BucketIconButton(props: Omit<IconButtonProps, 'name'>) {
    return (
        <ToolIconButton
            name={BUCKET_TOOL_NAME}
            title={BUCKET_TOOL_TITLE}
            {...props}
        >
            <BucketIcon/>
        </ToolIconButton>
    )
}