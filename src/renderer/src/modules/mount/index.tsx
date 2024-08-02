import { useCallback, useState } from 'react'
import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { isEmpty } from 'lodash'
import ContainersList from './ContainersList'

function Mount(): JSX.Element {
    const [targetContainerPath, setTargetContainerPath] = useState('')
    const [password, setPassword] = useState('')

    const resetInputs = useCallback(() => {
        setTargetContainerPath('')
        setPassword('')
    }, [])

    const handleLocationInput = async (): Promise<void> => {
        const containerOpenPath = await window.api.showNativeOpenDialog({
            properties: ['showHiddenFiles', 'dontAddToRecent', 'openFile'],
        })

        if (isEmpty(containerOpenPath)) return
        setTargetContainerPath(containerOpenPath[0])
    }

    const handleMountButtonClick = async (): Promise<void> => {
        window.api.mountEncryptedContainer({
            path: targetContainerPath,
            password,
        })
        resetInputs()
    }

    const isMountButtonEnabled =
        !isEmpty(password) && !isEmpty(targetContainerPath)
    return (
        <div className="live-area relative m-2 overflow-hidden rounded-lg border-2 p-4 pb-0">
            <div>
                <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                    Mount an encrypted container
                </h2>
                <p className="leading-7">
                    Select an encrypted container file and enter the password to
                    mount it.
                </p>
                <div className="mt-4 flex flex-col space-y-4">
                    <div data-test-id="mount-drive-form">
                        <div className="flex flex-row gap-x-4">
                            <Input
                                onClick={() => handleLocationInput()}
                                onChange={(e) =>
                                    setTargetContainerPath(e.target.value)
                                }
                                type="text"
                                placeholder="Select an encrypted container"
                                value={targetContainerPath}
                            />
                            <Button onClick={() => handleLocationInput()}>
                                Browse
                            </Button>
                        </div>
                        <Input
                            className="mt-4"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter the container password"
                            value={password}
                        />
                        <div className="mt-4 flex flex-1 justify-center">
                            <Button
                                className="w-1/2"
                                onClick={() => handleMountButtonClick()}
                                disabled={!isMountButtonEnabled}
                            >
                                Mount encrypted container
                            </Button>
                        </div>
                    </div>
                    <div className="rounded-lg bg-card">
                        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                            Mounted containers
                        </h2>
                        <p className="leading-7">
                            View and manage your currently mounted encrypted
                            containers.
                        </p>
                        <div className="mounted-containers">
                            <ContainersList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mount
