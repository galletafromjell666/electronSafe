import { useTheme } from '@renderer/ThemeProvider'
import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Switch } from '@renderer/components/ui/switch'

function Settings(): JSX.Element {
    const { setTheme, theme } = useTheme()

    return (
        <div className="live-area relative m-2 flex flex-col space-y-4 overflow-hidden rounded-lg border-2 p-4 pb-0">
            <div className='border-b-2 pb-4'>
                <h4 className="mb-4 scroll-m-20 text-xl font-medium tracking-tight">
                    Main Program Location
                </h4>
                <div className="flex flex-row gap-x-4">
                    <Input
                        onChange={() => {}}
                        type="text"
                        placeholder={
                            'C:\\Program Files\\VeraCrypt\\VeraCrypt.exe'
                        }
                        value={''}
                    />
                    <Button onClick={() => {}}>Browse</Button>
                </div>
            </div>
            <div className='border-b-2 pb-4'>
                <h4 className="mb-4 scroll-m-20 content-between items-center text-xl font-medium tracking-tight">
                    Appearance
                </h4>

                <div className="flex flex-row justify-between gap-x-4">
                    <p className="leading-7">Use dark color theme</p>
                    <Switch
                        checked={theme === 'dark'}
                        onCheckedChange={() =>
                            setTheme(theme === 'light' ? 'dark' : 'light')
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default Settings
