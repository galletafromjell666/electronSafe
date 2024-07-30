import { Combobox } from '@renderer/components/ui/combobox'

const fileSystems = [
    { label: 'NTFS', value: 'ntfs' },
    { label: 'FAT', value: 'fat' },
    { label: 'exFAT', value: 'exfat' },
]

function FileSystem(): JSX.Element {
    return (
        <div
            className="rounded-lg border-2 p-4"
            data-test-id="filesystem-container"
        >
            <h4 className="mb-4 scroll-m-20 text-xl font-medium tracking-tight">
                File System
            </h4>
            <Combobox
                items={fileSystems}
                placeholder="Select a file system"
                noResultsMessage="No file system found"
            />
        </div>
    )
}

export default FileSystem
