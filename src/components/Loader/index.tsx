export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#076670] rounded-full animate-ping"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#02282C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
