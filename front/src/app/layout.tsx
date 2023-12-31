import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/redux/provider";
import Navbar from "@/components/nav";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Blog News",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SessionAuthProvider>
            <Navbar />
            {children}
          </SessionAuthProvider>
        </Providers>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
