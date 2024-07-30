import { Input } from '@renderer/components/ui/input'

interface ContainerLocationProps {
    path: string
    handleLocationInput: () => void
}

function ContainerLocation({
    path,
    handleLocationInput,
}: ContainerLocationProps): JSX.Element {
    return (
        <div
            className="rounded-lg border-2 p-4"
            data-test-id="location-container"
        >
            <h4 className="mb-4 scroll-m-20 text-xl font-medium tracking-tight">
                Location
            </h4>
            <Input
                onClick={() => handleLocationInput()}
                type="text"
                placeholder="E:\"
                value={path}
            />
        </div>
    )
}

export default ContainerLocation
