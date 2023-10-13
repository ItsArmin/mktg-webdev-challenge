import React from 'react'
import { AppProps } from 'next/app'
import './style.css'
import Head from 'next/head'

const EmptyLayout = ({ children }) => children

interface HashiAppProps extends AppProps {
	Component: AppProps['Component'] & { layout?: React.ComponentType }
}

function App({ Component, pageProps }: HashiAppProps): React.ReactElement {
	const Layout = Component.layout ?? EmptyLayout
	return (
		<Layout>
			<Head>
				<title>HashiCorp People Directory</title>
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}

export default App
