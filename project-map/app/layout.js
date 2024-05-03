import '../styles/globals.css';
import {Providers} from '@/redux/provider';
import MyMap from '@/components/MyMap/MyMap';
import {Raleway} from 'next/font/google';
import ThemeSwitch from '@/components/ThemeSwitch/ThemeSwitch';
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
            <main>
               <Providers>
                  <MyThemeProvider>
                     <Header/>
                     {children}
                     <MyMap/>
                     <ThemeSwitch/>
                  </MyThemeProvider>
               </Providers>
            </main>
         </body>
      </html>
   );
}
