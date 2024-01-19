import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PropTypes from 'prop-types'

const queryClient = new QueryClient()

function ReactQueryClientProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

ReactQueryClientProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default ReactQueryClientProvider
