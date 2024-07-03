import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <main>
      <div className="h-screen flex justify-center items-center bg-lightblue px-5">
        <LoginForm />
      </div>
    </main>
  );
}
