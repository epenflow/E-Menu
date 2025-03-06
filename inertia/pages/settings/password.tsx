import { useForm } from '@inertiajs/react'
import ForgotUserPassword from '~/components/base/forgot-user-password'
import Button from '~/components/ui/button'
import { InputPassword } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Block, Heading, Text } from '~/components/ui/typography'
import DashboardLayout from '~/layouts/dashboard-layout'
import SettingLayout from '~/layouts/setting-layout'

export default function () {
  const { breadcrumbs } = resources

  const { data, setData, errors, processing, patch } = useForm({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    patch('profile/update-password')
  }

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <SettingLayout>
        <div className="max-w-xl space-y-6">
          <Block className="gap-1 mb-6">
            <Heading level={3} className="font-medium">
              Update password
            </Heading>
            <Text>Ensure your account is using a long, random password to stay secure</Text>
          </Block>
          <form className="space-y-4" onSubmit={submit}>
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current password</Label>
              <InputPassword
                id="currentPassword"
                value={data.currentPassword}
                onChange={(event) => setData('currentPassword', event.target.value)}
                autoComplete="current-password"
              />
              {errors.currentPassword ? (
                <p className="text-destructive text-sm">{errors.currentPassword}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>
              <InputPassword
                id="newPassword"
                value={data.newPassword}
                onChange={(event) => setData('newPassword', event.target.value)}
                autoComplete="new-password"
              />
              {errors.newPassword ? (
                <p className="text-destructive text-sm">{errors.newPassword}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <InputPassword
                value={data.confirmPassword}
                id="confirmPassword"
                onChange={(event) => setData('confirmPassword', event.target.value)}
                autoComplete="new-password"
              />
              {errors.confirmPassword ? (
                <p className="text-destructive text-sm">{errors.confirmPassword}</p>
              ) : null}
            </div>
            <Button isPending={processing} type="submit">
              {processing ? 'Saving...' : 'Save'}
            </Button>
          </form>

          <ForgotUserPassword />
        </div>
      </SettingLayout>
    </DashboardLayout>
  )
}
const resources = {
  breadcrumbs: [
    {
      title: 'Settings',
      href: '#',
    },
    {
      title: 'Profile',
    },
  ],
}
