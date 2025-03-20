import Header from "@/components/common/Header";
import Navbar from "@/components/common/Navbar";

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="w-full h-screen overflow-y-scroll overflow-x-hidden no-scrollbar p-6">
        <Header />
        {children}
      </main>
    </>
  );
}
