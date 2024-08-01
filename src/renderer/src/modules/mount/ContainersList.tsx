import { Button } from '@renderer/components/ui/button'

const data = [
    {
        name: 'AAAA',
        mounted: true,
    },
    {
        name: 'BBB',
        mounted: true,
    },
    {
        name: 'CCC',
        mounted: true,
    },
    {
        name: 'AAAA1',
        mounted: true,
    },
    {
        name: 'BBB1',
        mounted: true,
    },
    {
        name: 'CCC3',
        mounted: true,
    },
    {
        name: 'AAAA11',
        mounted: true,
    },
    {
        name: 'BBB13',
        mounted: true,
    },
    {
        name: 'CCC31',
        mounted: true,
    },
]

function ContainersList(): JSX.Element {
    return (
        <div>
            <div className="flex w-full flex-1 flex-row border-b-2 p-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50">
                <div className="w-2/4">Drive</div>
                <div className="w-[30%]">Status</div>
                <div className="w-[20%]">Actions</div>
            </div>
            {data.map((e) => {
                return (
                    <div
                        key={e.name}
                        className="flex w-full flex-1 flex-row border-b-2 p-2 transition-colors hover:bg-muted/50"
                    >
                        <div className="my-auto w-2/4">
                            <p>e.name</p>
                        </div>
                        <div className="my-auto w-[30%]">
                            <p>{`${e.mounted}`}</p>
                        </div>
                        <div className="my-auto w-[20%]">
                            <Button onClick={() => {}}>Dismount</Button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ContainersList
