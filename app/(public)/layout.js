import { Fragment } from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { CartProvider } from './CartProvider';
 
export default function PublicLayout({ children }) {
  return (
    <Fragment>
      <CartProvider>
        <Header />
        <main>
         {children}
        </main>
        <Footer />
        </CartProvider>
    </Fragment>
  )
}
