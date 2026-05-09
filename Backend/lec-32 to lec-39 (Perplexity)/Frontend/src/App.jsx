import { RouterProvider } from "react-router"
import { appRouter } from "./routes/app.routes.jsx"

const App = () => {
  return (
    <RouterProvider router={appRouter} />
  )
}

export default App