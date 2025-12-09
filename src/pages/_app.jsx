import Footer from "@/common/Footer";
import Header from "@/common/Header";
import "@/styles/globals.css";
import useUTMSource from "@/utils/useUTMSource";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import Preloader from "@/common/Preloader";

export default function App({ Component, pageProps }) {
  useUTMSource();
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <Preloader/>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </SnackbarProvider>
      </QueryClientProvider>
    </>
  );
}
