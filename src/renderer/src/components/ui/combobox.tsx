import * as React from 'react'
import { cn } from '@renderer/utils/utils'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@renderer/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@renderer/components/ui/popover'
import { Button } from '@renderer/components/ui/button'
import { Check, Maximize2 } from 'lucide-react'

interface ComboboxItems {
    value: string
    label: string
}

interface ComboboxProps {
    placeholder: string
    noResultsMessage: string
    items: Array<ComboboxItems>
}
/**
 * Please read https://github.com/shadcn-ui/ui/issues/2980
 */
export function Combobox({
    items,
    placeholder,
    noResultsMessage,
}: ComboboxProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')

    console.log('combobox items', { items })
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? items.find((item) => item.value === value)?.label
                        : placeholder}
                    <Maximize2 className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search item..."
                        className="h-9"
                    />
                    <CommandEmpty>{noResultsMessage}</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ''
                                                : currentValue
                                        )
                                        setOpen(false)
                                    }}
                                >
                                    {item.label}
                                    <Check
                                        className={cn(
                                            'ml-auto h-4 w-4',
                                            value === item.value
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
