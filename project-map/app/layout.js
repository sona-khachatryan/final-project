import './globals.css';
import {Providers} from '@/redux/provider';
import MyMap from "@/components/MyMap/MyMap";

export const metadata = {
   title: '',
   description: '',
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body>
            {/*header*/}
            <main>
               <Providers>
                  <MyMap/>
                  {children}
               </Providers>
            </main>
            {/*footer*/}
         </body>
      </html>
   );
}
