import Navbar from "../components/navbar";
import ValidateGrid from "../components/validate";

export default function Validate() {
  return (
    <main>
      <Navbar />
      <div className="bg-white h-screen">
        <ValidateGrid />
      </div>
    </main>
  );
}
