function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900 text-white">
      <h1 className="text-5xl font-bold">Loading</h1>
      <span className="relative flex h-8 w-8 ml-2 mt-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-8 w-8 bg-sky-500"></span>
      </span>
      <span className="relative flex h-8 w-8 ml-2 mt-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-8 w-8 bg-sky-500"></span>
      </span>
      <span className="relative flex h-8 w-8 ml-2 mt-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-8 w-8 bg-sky-500"></span>
      </span>
    </div>
  );
}

export default Loading;
