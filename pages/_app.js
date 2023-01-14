import '../styles/globals.css'
import App from "next/app"

import { AuthProvider, getUser } from "../context/AuthContext"

const MyApp = ({ Component, pageProps, auth }) => {
  return (
    <AuthProvider myAuth={auth}>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const auth = await getUser(appContext.ctx)
  // console.log("appProps: ", appProps);
  return { ...appProps, auth: auth }
}
export default MyApp