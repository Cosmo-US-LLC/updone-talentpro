'use client'
import GlobalErrorModal from '@/app/_components/ui/error-modal';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { AuthProvider } from '../context/AuthContext';
import { BookingProvider } from '../context/BookingContext';
import { ErrorProvider } from '../context/ErrorProvider';
import { poppins } from '../Fonts';
import useIsMobile from '../hooks/useMobile';
import store from './store';

interface RootLayoutProps {
    children: ReactNode;
}

const ReduxProvider = ({ children }: RootLayoutProps) => {
    const router = useRouter();
    const isMobile = useIsMobile();
    const isProd = process.env.NODE_ENV === 'production';

    useEffect(() => {
        const handleRouteChange = () => {
            window.scrollTo(0, 0);  // Scroll to top on page change
        };
        //@ts-ignore
        router?.events?.on('routeChangeComplete', handleRouteChange);

        return () => {
            //@ts-ignore
            router?.events?.off('routeChangeComplete', handleRouteChange);  // Cleanup the event listener
        };
    }, [router]);

    return (
        <>
            {
                // (isProd && isMobile) ?
                //     <MobileComingSoon />
                //     :
                <div className={`main-layout ${poppins.className}`}>
                    <AuthProvider>
                        <Provider store={store}>
                            <ErrorProvider>
                                <BookingProvider>
                                    {/* <Elements stripe={stripePromise}> */}
                                    {children}
                                    <GlobalErrorModal />
                                    {/* </Elements> */}
                                </BookingProvider>
                            </ErrorProvider>
                        </Provider>
                    </AuthProvider>
                </div>
            }
        </>
    );
};

export default ReduxProvider;
