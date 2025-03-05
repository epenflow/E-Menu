import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import type { UserInfo } from 'os'
import type React from 'react'
import { useInitials } from '~/hooks/use-initials'
import { Avatar, AvatarFallback } from '../ui/avatar'

type UserInfoProps = {
  showEmail?: boolean
  showAvatar?: boolean
}
const UserInfo: React.FC<UserInfoProps> = ({ showEmail, showAvatar = true }) => {
  const { user } = usePage<SharedProps>().props
  const getInitial = useInitials()
  return (
    <>
      {showAvatar ? (
        <Avatar>
          <AvatarFallback>{getInitial(user!.name)}</AvatarFallback>
        </Avatar>
      ) : null}

      <div className="grid flex-1 text-left text-sm leading-tight text-foreground">
        <span>{user!.name}</span>
        {showEmail ? <span className="text-sm text-muted-foreground">{user!.email}</span> : null}
      </div>
    </>
  )
}
export default UserInfo
