import { Link } from "react-router";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-[90vh] gap-4">
      <h1 className="text-purple-800 text-5xl font-bold mb-2">
        Welcome to Learnly!
      </h1>
      <div className="flex flex-col gap-4">
        <p className="text-center text-lg">
          Take a quiz to test your knowledge on various topics
        </p>
        <Link to="/quiz">
          <button className="rounded-lg bg-[#f9f9f9] w-96 py-2 cursor-pointer border-2 border-transparent hover:border-[#646cff] transition-colors duration-250">
            Start Quiz
          </button>
        </Link>
        <Link to="/">
          <button className="rounded-lg bg-[#f9f9f9] w-96 py-2 cursor-pointer border-2 border-transparent hover:border-[#646cff] transition-colors duration-250">
            About Us
          </button>
        </Link>
      </div>
    </main>
  );
}
