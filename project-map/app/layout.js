import './globals.css';
import {Providers} from '@/redux/provider';



export const metadata = {
   title: '',
   description: '',
};

export default function RootLayout({ children },) {
   return (
      <html lang="en">
         <body>
            {/*header*/}
            <main>
               <Providers>
                  {children}
               </Providers>

            </main>
            {/*footer*/}
         </body>
      </html>
   );
}
