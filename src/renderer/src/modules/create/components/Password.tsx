import { Input } from '@renderer/components/ui/input'

interface PasswordProps {
    password: string
    setPassword: (a: string) => void
}

function Password({ password, setPassword }: PasswordProps): JSX.Element {
    return (
        <div
            className="rounded-lg border-2 p-4"
            data-test-id="password-container"
        >
            <h4 className="mb-4 scroll-m-20 text-xl font-medium tracking-tight">
                Password
            </h4>
            <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
            />
        </div>
    )
}

export default Password
