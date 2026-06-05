import PageHeader from "../components/PageHeader";

export default function FiturXyz({ title, breadcrumb, children }) {
  return (
    <div className="flex items-start justify-between px-2 pb-4">

      <h1 className="text-2xl font-bold text-gray-800">{title}
        Fitur XYZ adalah fitur terbaru yang kami luncurkan untuk meningkatkan
        pengalaman pengguna. Dengan Fitur XYZ, Anda dapat melakukan berbagai hal
        menarik seperti:
      </h1>
    </div>
  );
}
