import Pattern from '~/components/ui/pattern'
import For from '~/components/utility/for'
import DashboardLayout from '~/layouts/dashboard-layout'
import DashboardContainer from '~/layouts/dashboard/dashboard-container'

export default function () {
  return (
    <DashboardLayout
      breadcrumbs={[
        {
          title: 'Dashboard',
        },
      ]}
    >
      <DashboardContainer>
        <div className="min-h-dashboard-container h-full w-full py-6 [--diagonal-space:5.5px] flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-6">
            <For each={[1, 2, 3]}>
              {(key) => <Pattern key={key} className="h-52 border relative rounded-md" />}
            </For>
          </div>
          <Pattern className="h-[50svh] w-full relative border rounded-md" />
          <div className="grid grid-cols-2 gap-6">
            <For each={[1, 2]}>
              {(key) => <Pattern key={key} className="h-52 border relative rounded-md" />}
            </For>
          </div>
        </div>
      </DashboardContainer>
    </DashboardLayout>
  )
}
