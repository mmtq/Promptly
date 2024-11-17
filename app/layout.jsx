"use client";
import '@styles/global.css';
import Nav from '@components/Nav';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider

// export const metadata = {
//     title: 'Promptly',
//     description: 'Discover and Share AI Prompts',
// };

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <SessionProvider>  {/* Wrap your application with SessionProvider */}
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </SessionProvider>
            </body>
        </html>
    );
};

export default RootLayout;
