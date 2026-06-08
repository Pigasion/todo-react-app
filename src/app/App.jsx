import Router from './routing/Router'
import TasksPage from '@/pages/TasksPage'
import TaskPage from '@/pages/TaskPage'
import './styles'

const App = () => {
  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <div>Page 404 not found</div>,
  }
  return <Router routes={routes} />
}

export default App
