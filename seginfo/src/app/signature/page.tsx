import Navbar from "../components/navbar";
import SignatureGrid from "../components/signature";

export default function Signature() {
  return (
    <main>
      <Navbar />
      <div className="bg-white h-screen">
        <SignatureGrid />
      </div>
    </main>
  );
}
