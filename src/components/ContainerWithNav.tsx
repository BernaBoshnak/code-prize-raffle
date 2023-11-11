import Navigation from '@components/Navigation'

type ContainerWithNavProps = {
  children: React.ReactNode
}

const ContainerWithNav = ({ children }: ContainerWithNavProps) => {
  return (
    <div className="h-100 d-flex flex-column">
      {children}
      <Navigation />
    </div>
  )
}

export default ContainerWithNav
