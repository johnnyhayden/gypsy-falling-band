import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedVideo from "@/components/FeaturedVideo";
import TheShow from "@/components/TheShow";
import SetList from "@/components/SetList";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* Watching the band is what this page is for, so the video comes before the pitch. */}
      <FeaturedVideo />
      <TheShow />
      <SetList />
      <BookingForm />
      <Footer />
    </main>
  );
}
