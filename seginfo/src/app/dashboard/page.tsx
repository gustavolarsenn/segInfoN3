import Grid from "../components/grid";
import Navbar from "../components/navbar";

export default function Dashboard() {
  return (
    <main>
        <Navbar />
        <div className="bg-white h-screen">
            <Grid></Grid>
        </div>
    </main>
  );
}
