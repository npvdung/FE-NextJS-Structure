import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles/index.css';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Head>
                        <title>NextJS TailwindCSS TypeScript Starter</title>
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    </Head>
                    <Component {...pageProps} />
                </Hydrate>
            </QueryClientProvider>
        </>
    );
}

export default MyApp;
