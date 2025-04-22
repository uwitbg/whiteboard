import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#3a0ca3] via-[#1c1c3a] to-[#0b0b0b] text-white">
      <section
        id="hero"
        className="flex flex-col items-center justify-center h-screen p-4"
      >
        <div className="container flex-col justify-center gap-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-center capitalize font-bruno">
            Free Online Whiteboard
            <br />
            <span className="bg-gradient-to-r from-blue-200 to-purple-900 bg-clip-text text-transparent">
              Instantly Sketch, Write & Collaborate
            </span>
          </h1>
          <h2 className="text-lg sm:text-xl font-changa text-center">
            It's free and will always be! You can wirte or draw with ease - no
            sign-up, no install. Just open and start creating
          </h2>
          <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-blue-300 dark:hover:bg-lime-100 hover:text-purple-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="/board"
              rel="noopener noreferrer"
            >
              Go To Board
            </Link>
            <Link
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-purple-900 dark:hover:bg-purple-900 hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
              href="https://github.com/uwitbg/whiteboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </Link>
          </div>
        </div>
      </section>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"></main>
      <footer className="flex items-center justify-center h-48">
        <div className="container justify-center">
          <div className="flex flex-col gap-2 items-center justify-center">
            <p className="text-sm text-center">
              Made with ❤️ by{" "}
              <Link
                href="https://uwit.rs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-[#383838] dark:hover:text-[#ccc] font-semibold"
              >
                UWIT
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
