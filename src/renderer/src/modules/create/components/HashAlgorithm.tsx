import { Combobox } from '@renderer/components/ui/combobox'

const hashes = [
    { label: 'SHA-256', value: 'sha-256' },
    { label: 'SHA-512', value: 'sha-512' },
    { label: 'Whirlpool', value: 'whirlpool' },
    { label: 'Blake2s', value: 'blake2s' },
]
interface HashAlgorithmProps {
    setHashAlgorithm: (a: string) => void
    hashAlgorithm: string
}

function HashAlgorithm({
    setHashAlgorithm,
    hashAlgorithm,
}: HashAlgorithmProps): JSX.Element {
    return (
        <div className="rounded-lg border-2 p-4" data-test-id="hash-container">
            <h4 className="mb-4 scroll-m-20 text-xl font-medium tracking-tight">
                Hash Algorithm
            </h4>
            <Combobox
                items={hashes}
                setValue={setHashAlgorithm}
                value={hashAlgorithm}
                placeholder="Select a hash algorithm"
                noResultsMessage="No hash algorithm found"
            />
        </div>
    )
}

export default HashAlgorithm
