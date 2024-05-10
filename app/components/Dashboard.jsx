"use client"
// import Lottie from "lottie-react";
import Lottie from "lottie-react"
import Bird from "../../public/bird.json"

function Dashboard() {
    const style = {
        height: '100%',
    }
    return (
        <div className="flex h-[85vh]">
            <div className="w-1/2 ">
                <div className=" h-full">
                    <Lottie style={style} animationData={Bird} loop={true} />
                </div>
            </div>
            <div className="w-1/2"></div>
        </div>
    )
}

export default Dashboard