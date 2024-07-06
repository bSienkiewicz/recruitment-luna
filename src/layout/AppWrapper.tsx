import { Toaster } from 'react-hot-toast'
import { useSocketConnection } from '../hooks/useSocketConnection'

const AppWrapper = ({children} : any) => {
  useSocketConnection()
  return (
    <div className="flex flex-col h-svh w-screen">
      {children}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1E1E1E",
            color: "#fff",
            border: "1px solid #282828",
            paddingRight: "2rem",
            paddingLeft: "2rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          },
          success: {
            iconTheme: {
              primary: '#33D999',
              secondary: 'black',
            },
          },
        }}
      />
    </div>
  )
}

export default AppWrapper