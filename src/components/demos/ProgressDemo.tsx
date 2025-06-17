import { useState } from "react"
import { Slider } from "@/components/mdui/slider"
import { LinearProgress, CircularProgress } from "@/components/mdui/progress"

export default function ProgressDemo() {
  const [progress, setProgress] = useState(50)
  return (
    <div>
      <div className="flex items-center gap-8 justify-center">
        <CircularProgress value={progress} size={30} />
        <CircularProgress value={progress} />
        <CircularProgress value={progress} size={120} thickness={8} />
      </div>
      <div className="p-8 flex flex-col gap-4">
        <LinearProgress value={progress} />
        <LinearProgress value={progress} thickness={8} width={500} />
        <LinearProgress value={progress} variant="wavy" thickness={10} />
      </div>
      <div className="m-8 w-48 ">
        <Slider value={progress} size="sm" max={100} onChange={(value: number) => setProgress(value)} />
      </div>
    </div>
  )
}
