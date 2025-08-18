import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/(hidden-grouping-only-folder)/_pathlessLayout/_nested-layout/route-a')(
  {
    component: LayoutAComponent,
  },
)

function LayoutAComponent() {
  return <div>I'm A!</div>
}
