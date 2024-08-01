import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'

interface ContainerLocationProps {
    path: string
    handleLocationInput: () => void
    handleLocationChange: (a: string) => void
}

function ContainerLocation({
    path,
    handleLocationInput,
    handleLocationChange,
}: ContainerLocationProps): JSX.Element {
    return (
        <div
            className="rounded-lg border-2 p-4"
            data-test-id="location-container"
        >
            <h4 className="mb-4 scroll-m-20 text-xl font-medium tracking-tight">
                Location
            </h4>
            <div className="flex flex-row gap-x-4">
                <Input
                    onChange={(e) => handleLocationChange(e.target.value)}
                    type="text"
                    placeholder="E:\"
                    value={path}
                />
                <Button onClick={() => handleLocationInput()}>Browse</Button>
            </div>
        </div>
    )
}

export default ContainerLocation
