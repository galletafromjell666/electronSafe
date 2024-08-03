import { Link, useLocation, useNavigate } from 'react-router-dom'
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
    Minus,
    PackagePlus,
    Scaling,
    Settings,
    X,
} from 'lucide-react'

function Header(): JSX.Element {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    // TODO: Fix warning with the link component

    const onButtonClick = (action) => (): void => {
        window.api.sendFrameEvent(action)
    }

    return (
        <NavigationMenu className="frame w-full max-w-[none] justify-between border-b-2 p-1">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        active={pathname === routeNames.Create}
                        className={navigationMenuTriggerStyle()}
                        onClick={() => navigate(routeNames.Create)}
                    >
                        <PackagePlus className="mr-2" />
                        Create
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        active={pathname === routeNames.Mount}
                        className={navigationMenuTriggerStyle()}
                        onClick={() => navigate(routeNames.Mount)}
                    >
                        <HardDriveDownloadIcon className="mr-2" />
                        Mount
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        active={pathname === routeNames.Settings}
                        className={navigationMenuTriggerStyle()}
                        onClick={() => navigate(routeNames.Settings)}
                    >
                        <Settings className="mr-2" />
                        Settings
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
            <div className="flex space-x-2">
                <button
                    className="frame-button"
                    onClick={onButtonClick('minimize')}
                    aria-label="minimize button"
                >
                    <Minus />
                </button>
                <button
                    aria-label="resize button"
                    className="frame-button"
                    onClick={onButtonClick('maximize')}
                >
                    <Scaling />
                </button>
                <button
                    aria-label="close button"
                    className="frame-button"
                    onClick={onButtonClick('close')}
                >
                    <X />
                </button>
            </div>
        </NavigationMenu>
    )
}

export default Header
