import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Button from '~/components/ui/button'
import { cn } from '~/lib/utils'

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-foreground capitalize hidden md:block">{theme}</span>
      <Button
        onClick={toggleTheme}
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        className="relative size-7"
      >
        <Sun
          className={cn(
            `absolute transition-all duration-500`,
            theme === 'light' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          )}
        />

        <Moon
          className={cn(
            `absolute transition-all duration-500`,
            theme === 'dark' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          )}
        />

        <Laptop
          className={cn(
            `absolute transition-all duration-500`,
            theme === 'system' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          )}
        />

        <span className="sr-only">
          {theme === 'light' ? 'Light mode' : theme === 'dark' ? 'Dark mode' : 'System mode'}
        </span>
      </Button>
    </div>
  )
}
export default ThemeButton
