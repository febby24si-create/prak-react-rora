export default function TailWindCSS() {
  return (
    <div>
      <FlexboxGrid/>
        <h1 class="border m-4">Belajar Tailwind CSS 4</h1>
        <button
            className="bg-cyan-500 text-white px-4
                                py-2 mx-6 rounded shadow-cyan-500">Click Me
        </button>
      <Spacing/>
      <Typography/>
      <BorderRadius/>
      <BackgroundColors/>
       <ShadowEffects/>
    </div>
  );
}

function Spacing() {
  return (
    <div className="bg-cyan-500 shadow-lg p-8 m-10 rounded-lg">
      <h2 className="text-neutral-50 font-bold">Card Title</h2>
      <p className="mt-2 text-amber-100">
        Ini adalah contoh penggunaan padding dan margin di Tailwind.
      </p>
    </div>
  );
}

function Typography(){
    return (
        <div className="bg-amber-50 shadow-lg p-8 m-10 rounded-lg">
            <h1 className="text-3xl font-extrabold text-blue-600">Tailwind Typography</h1>
            <p className="text-gray-600 text-lg mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}

function BorderRadius(){
    return (
        <button className="border border-orange-400 border-blue-500 font-extrabold
                     text-blue-500 px-4 py-4 rounded-xl m-7"> Klik Saya </button>
    )
}

function BackgroundColors(){
    return(
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg m-10">
            <h3 className="text-xl font-bold">Tailwind Colors</h3>
            <p className="mt-0.5">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}

function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-cyan-600 p-4 text-white">
            <h1 className="text-lg font-bold">RoraWebsite</h1>
            <ul className="flex space-x-4">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </nav>
    )
}

function ShadowEffects(){
    return (
        <div className="bg-cyan-300 shadow-lg p-6 rounded-lg hover:shadow-amber-950 transition">
            <h3 className="text-xl font-semibold">Hover me!</h3>
            <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
        </div>
    )
}