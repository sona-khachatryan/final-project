import '../styles/globals.css';
import {Providers} from '@/redux/provider';
import MyMap from '@/components/MyMap/MyMap';
import {Raleway} from 'next/font/google';
import MyThemeProvider from '@/styles/themeProvider';
import Header from '@/components/Header/Header';

const raleway = Raleway({subsets:['latin']});

export const metadata = {
   title: '',
   description: '',
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className={raleway.className}>
            <Providers>
               <MyThemeProvider>
                  <header>
                     <Header/>
                  </header>
                  <main>
                     {children}
                     <MyMap/>
                  </main>
               </MyThemeProvider>
            </Providers>
         </body>
      </html>
   );
}
