import { Link, useLocation } from 'react-router-dom'
import { routeNames } from '../constants'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@renderer/components/ui/navigation-menu'
import {
    HardDriveDownloadIcon,
    PackagePlus,
    Settings,
    SunMoon,
} from 'lucide-react'
import { Button } from '@renderer/components/ui/button'
import { useTheme } from '@renderer/ThemeProvider'

function Header() {
    const { pathname } = useLocation()
    const { setTheme, theme } = useTheme()
    console.log({ theme })
    // TODO: Fix warning with the link component
    return (
        <NavigationMenu className="w-full max-w-[none] justify-between border-b-2 p-1">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to={routeNames.Create}>
                        <NavigationMenuLink
                            active={pathname === routeNames.Create}
                            className={navigationMenuTriggerStyle()}
                        >
                            <PackagePlus className="mr-2" />
                            Create
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to={routeNames.Mount}>
                        <NavigationMenuLink
                            active={pathname === routeNames.Mount}
                            className={navigationMenuTriggerStyle()}
                        >
                            <HardDriveDownloadIcon className="mr-2" />
                            Mount
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to={routeNames.Settings}>
                        <NavigationMenuLink
                            active={pathname === routeNames.Settings}
                            className={navigationMenuTriggerStyle()}
                        >
                            <Settings className="mr-2" />
                            Settings
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
            <Button
                variant="outline"
                size="icon"
                className="justify-self-end"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
                <SunMoon />
            </Button>
        </NavigationMenu>
    )
}

export default Header
