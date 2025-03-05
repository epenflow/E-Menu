import { UpdateProfileValidator } from '#validators/profile'
import type { SharedProps } from '@adonisjs/inertia/types'
import { useForm } from '@inertiajs/react'
import React from 'react'
import DeleteUser from '~/components/base/delete-user'
import Button from '~/components/ui/button'
import Input from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import DashboardLayout from '~/layouts/dashboard-layout'
import SettingLayout from '~/layouts/setting-layout'

export default function ({ ...props }: SharedProps) {
  const { data, setData, errors, processing, patch } = useForm<UpdateProfileValidator>({
    email: props.user?.email || '',
    username: props.user?.username || '',
    fName: props.user?.fName || '',
    lName: props.user?.lName || '',
  })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    patch('profile/update')
  }

  return (
    <DashboardLayout
      breadcrumbs={[
        {
          title: 'Settings',
          href: '#',
        },
        {
          title: 'Profile',
        },
      ]}
    >
      <SettingLayout>
        <div className="max-w-xl space-y-6">
          <form className="space-y-4" onSubmit={submit}>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="fName">First name</Label>
                <Input
                  id="fName"
                  defaultValue={data.fName || ''}
                  onChange={(event) => setData('fName', event.target.value)}
                />
                {errors.fName ? <p className="text-destructive text-sm">{errors.fName}</p> : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lName">Last name</Label>
                <Input
                  id="lName"
                  defaultValue={data.lName || ''}
                  onChange={(event) => setData('lName', event.target.value)}
                />
                {errors.lName ? <p className="text-destructive text-sm">{errors.lName}</p> : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                defaultValue={data.username}
                onChange={(event) => setData('username', event.target.value)}
              />
              {errors.username ? (
                <p className="text-destructive text-sm">{errors.username}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={data.email}
                onChange={(event) => setData('email', event.target.value)}
              />
              {errors.email ? <p className="text-destructive text-sm">{errors.email}</p> : null}
            </div>
            <Button isPending={processing} type="submit">
              {processing ? 'Saving...' : 'Save'}
            </Button>
          </form>

          <DeleteUser />
        </div>
      </SettingLayout>
    </DashboardLayout>
  )
}
