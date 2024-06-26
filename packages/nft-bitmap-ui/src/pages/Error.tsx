import {useRouteError} from "react-router-dom";
import {TetrisBackground} from "@/layout/TetrisBackground.tsx";

export function ErrorPage(){
    const error = useRouteError() as {statusText?: string, message: string};
    console.error(error);
    return (
        <>
            <TetrisBackground/>
            <div id="error-page">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </>

    );
}
