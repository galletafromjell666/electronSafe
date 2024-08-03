import { Combobox } from '@renderer/components/ui/combobox'

const algorithms = [
    { label: 'AES', value: 'aes' },
    { label: 'Serpent', value: 'serpent' },
    { label: 'Twofish', value: 'twofish' },
    { label: 'Camellia', value: 'camellia' },
    { label: 'Kuznyechik', value: 'kuznyechik' },
    { label: 'AES(Twofish(Serpent))', value: 'aes(twofish(serpent))' },
    { label: 'Serpent(AES)', value: 'serpent(aes)' },
    { label: 'Serpent(Twofish(AES))', value: 'serpent(twofish(aes))' },
    { label: 'Twofish(Serpent)', value: 'twofish(serpent)' },
    { label: 'Camellia(Kuznyechik)', value: 'camellia(kuznyechik)' },
    { label: 'Kuznyechik(Twofish)', value: 'kuznyechik(twofish)' },
    { label: 'Camellia(Serpent)', value: 'camellia(serpent)' },
    { label: 'Kuznyechik(AES)', value: 'kuznyechik(aes)' },
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
