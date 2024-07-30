import { Combobox } from '@renderer/components/ui/combobox'

const algorithms = [
    { label: 'AES', value: 'aes' },
    { label: 'AES(Twofish)', value: 'aes_two_fish' },
    { label: 'Camellia', value: 'camellia' },
]

interface EncryptionAlgorithmProps {
    setEncryptionAlgorithm: (a: string) => void
    encryptionAlgorithm: string
}

function EncryptionAlgorithm({
    setEncryptionAlgorithm,
    encryptionAlgorithm,
}: EncryptionAlgorithmProps): JSX.Element {
    return (
        <div
            className="rounded-lg border-2 p-4"
            data-test-id="algorithm-container"
        >
            <h4 className="mb-4 scroll-m-20 text-xl font-medium tracking-tight">
                Encryption Algorithm
            </h4>
            <Combobox
                setValue={setEncryptionAlgorithm}
                value={encryptionAlgorithm}
                items={algorithms}
                placeholder="Select an algorithm"
                noResultsMessage="No algorithm found"
            />
        </div>
    )
}

export default EncryptionAlgorithm
