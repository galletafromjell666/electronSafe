import { useMemo, useState } from 'react'
import { isEmpty } from 'lodash'
import {
    calculateUsedPercent,
    convertBytesToGigaBytes,
} from '@renderer/utils/storage'

import ContainerLocation from './components/ContainerLocation'
import ContainerSize from './components/ContainerSize'
import FileSystem from './components/FileSystem'
import Password from './components/Password'
import EncryptionAlgorithm from './components/EncryptionAlgorithm'
import HashAlgorithm from './components/HashAlgorithm'
import { Button } from '@renderer/components/ui/button'

enum FormStep {
    VolumeInfo = 'volumeInfo',
    Encryption = 'encryption',
    Password = 'password',
}

function Create(): JSX.Element {
    const [path, setPath] = useState('')
    const [password, setPassword] = useState('')
    const [containerSize, setContainerSize] = useState(1)
    const [volumeDetails, setVolumeDetails] = useState<any>({})
    const [formStep, setFormStep] = useState<FormStep>(FormStep.VolumeInfo)

    const handleLocationInput = async (): Promise<void> => {
        console.log('handleLocationInput')
        const containerSavePath = await window.api.showNativeSaveDialog({
            title: 'new encrypted container',
            // buttonLabel: "Set location",
            defaultPath: 'myNewEncryptedContainer.safe',
        })

        if (isEmpty(containerSavePath)) {
            setVolumeDetails({})
            setPath('')
        }

        const volumeStats = await window.api.getVolumeDetails(containerSavePath)
        setVolumeDetails({
            free: convertBytesToGigaBytes(volumeStats.free),
            total: convertBytesToGigaBytes(volumeStats.total),
            percentUsed: calculateUsedPercent(
                volumeStats.total,
                volumeStats.free
            ),
        })
        setPath(containerSavePath)
    }

    // console.log({ path, password, volumeDetails });

    const CurrentFormComponent = useMemo(() => {
        if (formStep === FormStep.VolumeInfo) {
            /**
             * On the first step we render:
             * - Container location
             * - Container Size
             */
            return (
                <>
                    <ContainerLocation
                        path={path}
                        handleLocationInput={handleLocationInput}
                    />
                    {volumeDetails?.percentUsed ? (
                        <ContainerSize
                            containerSize={containerSize}
                            setContainerSize={setContainerSize}
                            volumeDetails={volumeDetails}
                            path={path}
                        />
                    ) : null}
                </>
            )
        } else if (formStep === FormStep.Encryption) {
            /**
             * On the second step we render:
             * - File System
             * - Encryption Algorithm
             * - Hash Algorithm
             */
            return (
                <>
                    <FileSystem />
                    <EncryptionAlgorithm />
                    <HashAlgorithm />
                </>
            )
        }

        return (
            <>
                <Password password={password} setPassword={setPassword} />
            </>
        )
    }, [containerSize, formStep, password, path, volumeDetails])

    return (
        <div className="live-area relative m-2 rounded-lg border-2 p-4 pb-0">
            <h2 className="scroll-m-20 pb-4 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                Create an encrypted container
            </h2>
            <div className="flex flex-col space-y-4">
                {CurrentFormComponent}
            </div>
            <div className="bg-red-100">
                <Button>Previous</Button>
                <Button>Next</Button>
            </div>
        </div>
    )
}

export default Create
