import { Button } from '@renderer/components/ui/button'
import { HardDriveUpload } from 'lucide-react'

const data = [
    {
        name: 'C:\\Users\\gio\\Documents\\GitHub\\safeElectron.exe',
        mountPoint: 'A:',
    },
    {
        name: 'C:\\Users\\gio\\Documents\\gio.exe',
        mountPoint: 'H:',
    },
    {
        name: 'C:\\Users\\gio\\uwu.exe',
        mountPoint: 'G:',
    },
    {
        name: 'C:\\Users\\gio\\uwu2.exe',
        mountPoint: 'Z:',
    },
    {
        name: 'C:\\Users\\Alex\\test.exe',
        mountPoint: 'G:',
    },
    {
        name: 'C:\\Users\\Alex\\mapache.exe',
        mountPoint: 'Z:',
    },
]

function ContainersList(): JSX.Element {
    const handleDismountButtonClick = (a): void => {
        console.log(a)
    }
    return (
        <div>
            <div className="flex w-full flex-1 flex-row border-b-2 p-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50">
                <div className="w-2/4">Drive</div>
                <div className="w-[30%]">Mount Point</div>
                <div className="w-[20%]">Actions</div>
            </div>
            {data.map((e) => {
                return (
                    <div
                        key={e.name}
                        className="container-row flex w-full flex-1 flex-row border-b-2 p-2 transition-colors hover:bg-muted/50"
                    >
                        <div className="my-auto w-2/4">
                            <p>{e.name}</p>
                        </div>
                        <div className="my-auto w-[30%]">
                            <p>{`${e.mountPoint}`}</p>
                        </div>
                        <div className="action-cell pointer-events-none my-auto w-[20%] opacity-0 transition-colors">
                            <Button
                                variant="outline"
                                onClick={() => handleDismountButtonClick(e)}
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
