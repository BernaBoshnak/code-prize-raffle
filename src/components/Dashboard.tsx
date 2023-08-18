import Container from './dashboard/Container'
import Navigation from './dashboard/Navigation'

const Dashboard = () => {
  return (
    <div className="h-100 d-flex flex-column bg-light text-warning">
      <Container />
      <Navigation />
    </div>
  )
}

export default Dashboard
