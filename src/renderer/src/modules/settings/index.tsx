import { SunMoon } from 'lucide-react'
import { useTheme } from '@renderer/ThemeProvider'
import { Button } from '@renderer/components/ui/button'

function Settings(): JSX.Element {
    const { setTheme, theme } = useTheme()
    return (
        <div>
            <Button
                variant="outline"
                size="icon"
                className="justify-self-end"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
                <SunMoon />
            </Button>
        </div>
    )
}

export default Settings
