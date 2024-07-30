import { Input } from '@renderer/components/ui/input'
import { Progress } from '@renderer/components/ui/progress'
import { convertBytesToGigaBytes } from '@renderer/utils/storage'

interface ContainerSizeProps {
    containerSize: number
    setContainerSize: (a: number) => void
    volumeDetails: any
    path: string
}
function ContainerSize({
    containerSize,
    setContainerSize,
    volumeDetails,
    path,
}: ContainerSizeProps): JSX.Element {
    return (
        <div className="rounded-lg border-2 p-4" data-test-id="size-container">
            <h4 className="mb-4 scroll-m-20 text-xl font-medium tracking-tight">
                Container size
            </h4>
            <div className="grid grid-cols-2 p-4">
                <div>
                    <p className="leading-7">Size</p>
                    {/*TODO: Add MB to the end of the INPUT */}
                    <Input
                        className="mt-2 w-[80%]"
                        onChange={(e) =>
                            setContainerSize(Number(e.target.value))
                        }
                        type="number"
                        value={containerSize}
                    />
                </div>
                <div className="mt-auto">
                    <p className="mt-2 leading-7">
                        {/* TODO: Support other OS */}
                        Volume
                        <span className="ml-1 font-semibold">{`${
                            path.split('\\')[0]
                        }`}</span>
                    </p>
                    <Progress
                        value={volumeDetails.percentUsed}
                        className={`w-[${volumeDetails.percentUsed}%]`}
                    />
                    <p className="mt-2 leading-7">
                        {`${convertBytesToGigaBytes(volumeDetails.free)}GB Free of ${convertBytesToGigaBytes(volumeDetails.total)}GB - ${volumeDetails.percentUsed}% Used`}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ContainerSize
