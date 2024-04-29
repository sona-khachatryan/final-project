import '../styles/globals.css';
import {Providers} from '@/redux/provider';
import MyMap from '@/components/MyMap/MyMap';
import {Figtree} from 'next/font/google';

const figtree = Figtree({subsets:['latin']});

export const metadata = {
   title: '',
   description: '',
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className={figtree.className}>
            {/*header*/}
            <main>
               <Providers>
                  {children}
                  <MyMap/>
               </Providers>
            </main>
            {/*footer*/}
         </body>
      </html>
   );
}
