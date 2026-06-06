export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-12 py-6">
      <h1 className="text-white text-2xl font-bold">
        LaunchPad AI
      </h1>

      <ul className="flex gap-8 text-white">
        <li className="hover:text-purple-400 cursor-pointer">Home</li>
        <li className="hover:text-purple-400 cursor-pointer">About</li>
        <li className="hover:text-purple-400 cursor-pointer">Saved</li>
        <li className="hover:text-purple-400 cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
}