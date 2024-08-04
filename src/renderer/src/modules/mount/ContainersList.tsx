import { Button } from '@renderer/components/ui/button'
import { isEmpty } from 'lodash'
import { HardDriveUpload, ServerOff } from 'lucide-react'
import { useEffect, useState } from 'react'
interface MountedContainer {
    containerPath: string
    driveLetter: string
}

function ContainersList(): JSX.Element {
    // TODO: Use zustand or context
    const [containers, setContainers] = useState<MountedContainer[]>([])

    useEffect(() => {
        const handleMountEventFromMain = (
            _event: unknown,
            data: MountedContainer
        ): void => {
            setContainers((prevContainers) => {
                if (
                    prevContainers.some(
                        (c) => c.containerPath === data.containerPath
                    )
                ) {
                    return prevContainers
                }
                return [...prevContainers, data]
            })
        }

        const handleUnMountEventFromMain = (
            _event: unknown,
            data: MountedContainer
        ): void => {
            setContainers((prevContainers) => {
                return prevContainers.filter(
                    (c) => c.driveLetter !== data.driveLetter
                )
            })
        }

        window.ipc.on('unmount_command_completed', handleUnMountEventFromMain)
        window.ipc.on('mount_command_completed', handleMountEventFromMain)
        return (): void => {
            window.ipc.removeAllListeners('mount_command_completed')
            window.ipc.removeAllListeners('unmount_command_completed')
        }
    }, [])

    const handleDismountButtonClick = (mountLetter: string): void => {
        window.api.unMountEncryptedContainer({ mountLetter })
    }

    if (isEmpty(containers)) {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center space-y-4 rounded-lg border-2 p-2">
                <h4 className="text-xl font-medium tracking-tight">
                    No mounted containers available
                </h4>
                <ServerOff />
            </div>
        )
    }

    return (
        <div>
            <div className="flex w-full flex-1 flex-row border-b-2 p-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50">
                <div className="w-2/4">Drive</div>
                <div className="w-[30%]">Mount Point</div>
                <div className="w-[20%]">Actions</div>
            </div>
            {containers.map((e) => {
                return (
                    <div
                        key={e.containerPath}
                        className="container-row flex w-full flex-1 flex-row border-b-2 p-2 transition-colors hover:bg-muted/50"
                    >
                        <div className="my-auto w-2/4">
                            <p>{e.containerPath}</p>
                        </div>
                        <div className="my-auto w-[30%]">
                            <p>{`${e.driveLetter}`}</p>
                        </div>
                        <div className="action-cell pointer-events-none my-auto w-[20%] opacity-0 transition-colors">
                            <Button
                                variant="outline"
                                onClick={() =>
                                    handleDismountButtonClick(e.driveLetter)
                                }
                            >
                                <HardDriveUpload className="mr-2" />
                                Dismount
                            </Button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ContainersList
