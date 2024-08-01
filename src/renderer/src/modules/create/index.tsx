import { useCallback, useMemo, useState } from 'react'
import { isEmpty } from 'lodash'
import { calculateUsedPercent } from '@renderer/utils/storage'
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

interface VolumeDetails {
    free: number
    percentUsed: number // bytes
    total: number // bytes
}

interface ContainerDetails {
    hashAlgorithm: string
    encryptionAlgorithm: string
    fileSystem: string
    containerSize: number //bytes
}

const initialContainerDetailsState: ContainerDetails = {
    hashAlgorithm: '',
    encryptionAlgorithm: '',
    fileSystem: '',
    containerSize: 1,
}

function Create(): JSX.Element {
    const [path, setPath] = useState('')
    const [password, setPassword] = useState('')
    const [containerDetails, setContainerDetails] = useState(
        initialContainerDetailsState
    )
    const [volumeDetails, setVolumeDetails] = useState<VolumeDetails | null>(
        null
    )
    const [formStep, setFormStep] = useState<FormStep>(FormStep.VolumeInfo)

    const updateContainerDetail = (key, value): void => {
        setContainerDetails((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const handleLocationInput = async (): Promise<void> => {
        const containerSavePath = await window.api.showNativeSaveDialog({
            title: 'new encrypted container',
            defaultPath: 'myNewEncryptedContainer.safe',
        })

        if (isEmpty(containerSavePath)) {
            setVolumeDetails(null)
            setPath('')
            return
        }

        const volumeStats = await window.api.getVolumeDetails(containerSavePath)
        setVolumeDetails({
            free: volumeStats.free,
            total: volumeStats.total,
            percentUsed: calculateUsedPercent(
                volumeStats.total,
                volumeStats.free
            ),
        })
        setPath(containerSavePath)
    }

    const CurrentFormComponent = useMemo(() => {
        if (formStep === FormStep.VolumeInfo) {
            return (
                <>
                    <ContainerLocation
                        path={path}
                        handleLocationInput={handleLocationInput}
                        handleLocationChange={setPath}
                    />
                    {volumeDetails?.percentUsed ? (
                        <ContainerSize
                            containerSize={containerDetails.containerSize}
                            setContainerSize={(value) =>
                                updateContainerDetail('containerSize', value)
                            }
                            volumeDetails={volumeDetails}
                            path={path}
                        />
                    ) : null}
                </>
            )
        } else if (formStep === FormStep.Encryption) {
            return (
                <>
                    <FileSystem
                        fileSystem={containerDetails.fileSystem}
                        setFileSystem={(value) =>
                            updateContainerDetail('fileSystem', value)
                        }
                    />
                    <EncryptionAlgorithm
                        encryptionAlgorithm={
                            containerDetails.encryptionAlgorithm
                        }
                        setEncryptionAlgorithm={(value) =>
                            updateContainerDetail('encryptionAlgorithm', value)
                        }
                    />
                    <HashAlgorithm
                        hashAlgorithm={containerDetails.hashAlgorithm}
                        setHashAlgorithm={(value) =>
                            updateContainerDetail('hashAlgorithm', value)
                        }
                    />
                </>
            )
        }

        return (
            <>
                <Password password={password} setPassword={setPassword} />
            </>
        )
    }, [
        containerDetails.containerSize,
        containerDetails.encryptionAlgorithm,
        containerDetails.fileSystem,
        containerDetails.hashAlgorithm,
        formStep,
        password,
        path,
        volumeDetails,
    ])

    const isVolumeSizeValid = volumeDetails?.free
        ? volumeDetails?.free > containerDetails.containerSize
        : false

    const isContainerValid =
        !isEmpty(containerDetails.encryptionAlgorithm) &&
        !isEmpty(containerDetails.hashAlgorithm) &&
        !isEmpty(containerDetails.fileSystem)

    const isPasswordValid = !isEmpty(password)

    const isStepValid = useMemo(() => {
        if (formStep === FormStep.VolumeInfo) {
            return isVolumeSizeValid && !isEmpty(path)
        } else if (formStep === FormStep.Encryption) {
            return isContainerValid
        }
        return isPasswordValid
    }, [formStep, isContainerValid, isPasswordValid, isVolumeSizeValid, path])

    const handleNextButton = useCallback(() => {
        if (formStep === FormStep.VolumeInfo) {
            setFormStep(FormStep.Encryption)
        } else if (formStep === FormStep.Encryption) {
            setFormStep(FormStep.Password)
        }
        // TODO: Add here the call to the 'backend'
        return
    }, [formStep])

    return (
        <div className="live-area relative m-2 rounded-lg border-2 p-4 pb-0">
            <h2 className="scroll-m-20 pb-4 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                Create an encrypted container
            </h2>
            <div className="flex flex-col space-y-4">
                {CurrentFormComponent}
            </div>
            <div className="absolute bottom-0 left-0 w-full rounded-lg border-t-2 p-2">
                <div className="flex flex-row justify-end gap-2">
                    <Button>Previous</Button>
                    <Button
                        disabled={!isStepValid}
                        onClick={() => handleNextButton()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Create
