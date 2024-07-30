import { Combobox } from '@renderer/components/ui/combobox'

const hashes = [
    { label: 'SHA-512', value: 'sha_512' },
    { label: 'Whirlpool', value: 'whirlpool' },
    { label: 'SHA-256', value: 'sha-_256' },
]

function HashAlgorithm(): JSX.Element {
    return (
        <div className="rounded-lg border-2 p-4" data-test-id="hash-container">
            <h4 className="mb-4 scroll-m-20 text-xl font-medium tracking-tight">
                Hash Algorithm
            </h4>
            <Combobox
                items={hashes}
                placeholder="Select a hash algorithm"
                noResultsMessage="No hash algorithm found"
            />
        </div>
    )
}

export default HashAlgorithm
