import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import type React from 'react'
import Button, { type ButtonProps } from '~/components/ui/button'
import { cn } from '~/lib/utils'

type ThemeButtonProps = ButtonProps
const ThemeButton: React.FC<ThemeButtonProps> = ({ className, ...props }) => {
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
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      className={cn('relative size-7', className)}
      {...props}
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
  )
}
export default ThemeButton
