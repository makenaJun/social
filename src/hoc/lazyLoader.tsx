import React, { Suspense } from "react"
import Preloader from "../components/common/Preloader/Preloader"

export function lazyLoader <WCP>(Component: React.ComponentType<WCP>) {
    return (props: WCP) =>  (<Suspense fallback={<Preloader />}>
    <Component {...props}/>
    </Suspense>
    )
}
