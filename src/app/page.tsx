import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MediaGallery from "@/components/MediaGallery";
import SetList from "@/components/SetList";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <MediaGallery />
      <SetList />
      <BookingForm />
      <Footer />
    </main>
  );
}
