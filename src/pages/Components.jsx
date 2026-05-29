/**
 * Components.jsx — Pertemuan 10: React Components
 * Halaman showcase & dokumentasi komponen UI project Sedap
 */

import { useState } from "react";
import {
  FiSearch, FiPlus, FiPackage, FiUsers, FiTrendingUp,
  FiShoppingBag, FiAlertCircle, FiCheckCircle, FiInfo,
  FiMail, FiLock, FiEye, FiEyeOff, FiZap, FiCode,
  FiRefreshCw, FiLayout, FiGrid, FiBox, FiMessageSquare,
} from "react-icons/fi";

import PageHeader from "../components/PageHeader";
import {
  Button, Badge, Avatar,
  Container, Footer,
  Card, CardStat, ProductCard, Table,
  InputField, TextArea, SelectField,
  Alert, Modal, LoadingSpinner,
  HeroSection, FeatureSection, ProductSection,
} from "../components/ui";

import productsData from "../data/productsData.json";

/* ======================================================
   MOCK DATA
====================================================== */
const SAMPLE_PRODUCTS = productsData.slice(0, 6);

const TABLE_DATA = productsData.slice(0, 8).map((p) => ({
  ...p,
  status: p.stock > 20 ? "In Stock" : p.stock > 0 ? "Low Stock" : "Out of Stock",
}));

const TABLE_COLUMNS = [
  { key: "code", label: "Kode", render: (v) => (
    <span className="font-mono text-xs text-gray-500">{v}</span>
  )},
  { key: "title", label: "Nama Produk", render: (v) => (
    <span className="font-medium text-gray-800">{v}</span>
  )},
  { key: "category", label: "Kategori", render: (v) => (
    <Badge variant="info" size="sm">{v}</Badge>
  )},
  { key: "brand", label: "Brand" },
  { key: "price", label: "Harga", align: "right", render: (v) => (
    <span className="font-semibold text-gray-800">
      Rp {Number(v).toLocaleString("id-ID")}
    </span>
  )},
  { key: "status", label: "Status", align: "center", render: (v) => (
    <Badge
      variant={v === "In Stock" ? "success" : v === "Low Stock" ? "warning" : "danger"}
      dot size="sm"
    >
      {v}
    </Badge>
  )},
];

const FEATURES = [
  {
    icon: "🧩", title: "Reusable Component",
    description: "Tulis sekali, gunakan berkali-kali. Konsisten di seluruh halaman.",
    color: "emerald",
  },
  {
    icon: "🎨", title: "Props & Customizable",
    description: "Setiap komponen menerima props untuk kustomisasi tampilan dan perilaku.",
    color: "blue",
  },
  {
    icon: "📦", title: "Organized Structure",
    description: "Komponen dikelompokkan dalam folder /components/ui/ untuk kemudahan akses.",
    color: "purple",
  },
  {
    icon: "⚡", title: "Tailwind Powered",
    description: "Styling cepat dan konsisten menggunakan utility class Tailwind CSS.",
    color: "amber",
  },
  {
    icon: "♿", title: "Accessible",
    description: "Memperhatikan semantik HTML, keyboard navigation, dan ARIA label.",
    color: "teal",
  },
  {
    icon: "🔄", title: "State Management",
    description: "Komponen feedback seperti Modal dan Alert terintegrasi dengan useState.",
    color: "rose",
  },
];

const HERO_STATS = [
  { label: "Komponen Dibuat", value: "18+" },
  { label: "Kategori", value: "6" },
  { label: "Halaman Terintegrasi", value: "5" },
];

const CATEGORY_OPTIONS = [
  { value: "Electronics", label: "Electronics" },
  { value: "Furniture", label: "Furniture" },
  { value: "Apparel", label: "Apparel" },
  { value: "Home & Living", label: "Home & Living" },
  { value: "Appliances", label: "Appliances" },
  { value: "Sports", label: "Sports" },
];

/* ======================================================
   SECTION DIVIDER
====================================================== */
function SectionDivider({ icon, title, subtitle, tag }) {
  return (
    <div className="flex items-center gap-4 mt-2 mb-5">
      <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-hijau flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-gray-800">{title}</h2>
          {tag && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700 rounded-full">
              {tag}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}

/* ======================================================
   MAIN PAGE
====================================================== */
export default function Components() {
  // Form state
  const [formValues, setFormValues] = useState({
    name: "", email: "", category: "", description: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Feedback state
  const [loadingDemo, setLoadingDemo] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  // Product state (for interactive demo)
  const [demoProducts, setDemoProducts] = useState(SAMPLE_PRODUCTS);

  // Handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFormSubmit = () => {
    const errs = {};
    if (!formValues.name)     errs.name = "Nama tidak boleh kosong";
    if (!formValues.email)    errs.email = "Email tidak boleh kosong";
    if (!formValues.category) errs.category = "Pilih kategori terlebih dahulu";
    setFormErrors(errs);
    if (Object.keys(errs).length === 0) {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      setModalOpen(false);
    }
  };

  const handleLoadingDemo = () => {
    setLoadingDemo(true);
    setTimeout(() => setLoadingDemo(false), 2000);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setDetailModal(true);
  };

  const handleDeleteProduct = (id) => {
    setDemoProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-10 pb-10">
      {/* PAGE HEADER */}
      <PageHeader
        title="Components"
        breadcrumb={["Dashboard", "Components"]}
      >
        <Badge variant="info" dot>Pertemuan 10</Badge>
      </PageHeader>

      {/* ========================
          HERO SECTION
      ======================== */}
      <HeroSection
        badge="🧩 React Component Library"
        title="UI Component Sedap."
        subtitle="Kumpulan komponen React reusable yang dibangun di atas Tailwind CSS — siap pakai, konsisten, dan mudah dikustomisasi untuk seluruh halaman dashboard."
        actions={
          <>
            <Button
              variant="secondary"
              size="md"
              style={{ background: "rgba(255,255,255,0.2)", color: "white", borderColor: "rgba(255,255,255,0.3)" }}
              icon={<FiCode />}
              onClick={() => {}}
            >
              Lihat Source Code
            </Button>
            <Button
              variant="secondary"
              size="md"
              style={{ background: "white", color: "#00b074" }}
              icon={<FiSearch />}
              onClick={() => {}}
            >
              Explore Components
            </Button>
          </>
        }
        stats={HERO_STATS}
      />

      {/* ========================
          FEATURE SECTION
      ======================== */}
      <FeatureSection
        title="Prinsip Component Design"
        subtitle="Setiap komponen dirancang dengan prinsip yang jelas agar mudah dipahami, digunakan, dan dikembangkan lebih lanjut."
        features={FEATURES}
        cols={3}
      />

      {/* ========================
          BASIC COMPONENTS
      ======================== */}
      <section>
        <SectionDivider
          icon={<FiZap size={16} />}
          title="Basic Components"
          subtitle="Button, Badge, dan Avatar — fondasi UI yang sering digunakan"
          tag="3 komponen"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* BUTTON */}
          <Card title="Button" subtitle="Semua variant & ukuran">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Variants</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="sm">Primary</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="danger" size="sm">Danger</Button>
                  <Button variant="outline" size="sm">Outline</Button>
                  <Button variant="ghost" size="sm">Ghost</Button>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Sizes</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">States</p>
                <div className="flex flex-wrap gap-2">
                  <Button icon={<FiPlus />}>With Icon</Button>
                  <Button loading={loadingDemo} onClick={handleLoadingDemo}>
                    {loadingDemo ? "Loading..." : "Click Me"}
                  </Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* BADGE */}
          <Card title="Badge" subtitle="Status label & indikator">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Variants</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success">Success</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="neutral">Neutral</Badge>
                  <Badge variant="purple">Purple</Badge>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">With Dot</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" dot>Online</Badge>
                  <Badge variant="danger" dot>Offline</Badge>
                  <Badge variant="warning" dot>Busy</Badge>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Sizes</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="info" size="sm">Small</Badge>
                  <Badge variant="info" size="md">Medium</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* AVATAR */}
          <Card title="Avatar" subtitle="Foto profil & inisial">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Dari URL</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {["xs","sm","md","lg","xl"].map((size) => (
                    <Avatar
                      key={size}
                      src={`https://avatar.iran.liara.run/public/${10 + size.length}`}
                      name="Rora User"
                      size={size}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Inisial Fallback</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {["Andi Wirawan","Budi S","Citra K","Dian R"].map((name) => (
                    <Avatar key={name} name={name} size="md" />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Status Indicator</p>
                <div className="flex items-center gap-3">
                  <Avatar src="https://avatar.iran.liara.run/public/1" name="User" size="md" status="online" />
                  <Avatar src="https://avatar.iran.liara.run/public/2" name="User" size="md" status="busy" />
                  <Avatar src="https://avatar.iran.liara.run/public/3" name="User" size="md" status="offline" />
                  <div className="ml-2 space-y-1">
                    <p className="text-xs text-gray-500 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"/>Online</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400 inline-block"/>Busy</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300 inline-block"/>Offline</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ========================
          PRODUCT SECTION
      ======================== */}
      <section>
        <SectionDivider
          icon={<FiBox size={16} />}
          title="Data Display Components"
          subtitle="ProductCard, Card, dan Table untuk menampilkan data secara visual"
          tag="3 komponen"
        />

        <ProductSection
          title="ProductCard Component"
          subtitle={`Menampilkan ${demoProducts.length} dari ${SAMPLE_PRODUCTS.length} produk — klik Hapus untuk demo interaksi`}
          products={demoProducts}
          cols={3}
          onView={handleViewProduct}
          onDelete={handleDeleteProduct}
          onEdit={(p) => {
            setSelectedProduct(p);
            setModalOpen(true);
          }}
          action={
            <Button
              size="sm"
              variant="outline"
              icon={<FiRefreshCw size={12} />}
              onClick={() => setDemoProducts(SAMPLE_PRODUCTS)}
            >
              Reset
            </Button>
          }
        />
      </section>

      {/* ========================
          TABLE
      ======================== */}
      <section>
        <Card
          title="Table Component"
          subtitle="Tabel data dengan zebra stripe, custom render, dan badge status"
          action={
            <Button size="sm" icon={<FiSearch size={12} />} variant="secondary">
              Filter
            </Button>
          }
          padded={false}
        >
          <Table
            columns={TABLE_COLUMNS}
            data={TABLE_DATA}
            striped
          />
        </Card>
      </section>

      {/* ========================
          FORM COMPONENTS
      ======================== */}
      <section>
        <SectionDivider
          icon={<FiMessageSquare size={16} />}
          title="Form Components"
          subtitle="InputField, TextArea, dan SelectField — komponen input yang lengkap dengan validasi"
          tag="3 komponen"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Input variations */}
          <Card title="InputField" subtitle="Text input dengan icon, error state, hint">
            <div className="space-y-4">
              <InputField
                label="Nama Lengkap"
                name="name"
                placeholder="Masukkan nama lengkap..."
                value={formValues.name}
                onChange={handleFormChange}
                error={formErrors.name}
                icon={<FiUsers size={14} />}
                required
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="email@example.com"
                value={formValues.email}
                onChange={handleFormChange}
                error={formErrors.email}
                icon={<FiMail size={14} />}
                hint="Email digunakan untuk login"
              />
              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<FiLock size={14} />}
                iconRight={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="pointer-events-auto cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                }
              />
              <InputField
                label="Disabled Field"
                name="disabled"
                value="Tidak bisa diubah"
                disabled
              />
            </div>
          </Card>

          {/* Select & TextArea */}
          <Card title="SelectField & TextArea" subtitle="Dropdown dan multi-line input">
            <div className="space-y-4">
              <SelectField
                label="Kategori Produk"
                name="category"
                options={CATEGORY_OPTIONS}
                value={formValues.category}
                onChange={handleFormChange}
                error={formErrors.category}
                placeholder="-- Pilih Kategori --"
                required
              />
              <SelectField
                label="Prioritas"
                name="priority"
                options={[
                  { value: "high", label: "🔴 High Priority" },
                  { value: "med", label: "🟡 Medium Priority" },
                  { value: "low", label: "🟢 Low Priority" },
                ]}
                value="med"
                onChange={() => {}}
              />
              <TextArea
                label="Deskripsi Produk"
                name="description"
                placeholder="Tulis deskripsi produk di sini..."
                value={formValues.description}
                onChange={handleFormChange}
                rows={4}
                maxLength={200}
                hint="Ceritakan keunggulan produk secara singkat"
              />

              <div className="pt-2 flex justify-end gap-2">
                <Button variant="secondary" size="sm" onClick={() =>
                  setFormValues({ name: "", email: "", category: "", description: "" })
                }>
                  Reset
                </Button>
                <Button size="sm" onClick={handleFormSubmit}>
                  Submit & Validasi
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ========================
          FEEDBACK COMPONENTS
      ======================== */}
      <section>
        <SectionDivider
          icon={<FiAlertCircle size={16} />}
          title="Feedback Components"
          subtitle="Alert, Modal, dan LoadingSpinner untuk komunikasi dengan pengguna"
          tag="3 komponen"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* ALERT */}
          <Card title="Alert" subtitle="Notifikasi inline dengan semua variant">
            <div className="space-y-3">
              <Alert variant="success" title="Berhasil!" dismissible>
                Data produk berhasil disimpan ke database.
              </Alert>
              <Alert variant="danger" title="Terjadi Kesalahan" dismissible>
                Koneksi ke server gagal. Coba lagi beberapa saat.
              </Alert>
              <Alert variant="warning" title="Perhatian">
                Stok produk hampir habis. Segera tambah stok!
              </Alert>
              <Alert variant="info">
                Fitur export CSV tersedia di halaman Products.
              </Alert>
            </div>
          </Card>

          {/* MODAL & LOADING */}
          <div className="space-y-5">
            <Card title="Modal" subtitle="Dialog overlay dengan berbagai ukuran">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => setModalOpen(true)}
                    icon={<FiPlus size={13} />}
                  >
                    Form Modal
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setConfirmModal(true)}
                    icon={<FiAlertCircle size={13} />}
                  >
                    Confirm Modal
                  </Button>
                </div>
                <p className="text-xs text-gray-400">
                  Modal mendukung ESC untuk tutup, click backdrop, ukuran sm/md/lg/xl, dan custom footer.
                </p>
              </div>
            </Card>

            <Card title="LoadingSpinner" subtitle="3 variant: spin, dots, pulse">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="flex justify-center py-3">
                    <LoadingSpinner variant="spin" size="lg" color="green" />
                  </div>
                  <p className="text-xs text-gray-400 font-medium">Spin</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center py-3">
                    <LoadingSpinner variant="dots" color="blue" />
                  </div>
                  <p className="text-xs text-gray-400 font-medium">Dots</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center py-3">
                    <LoadingSpinner variant="pulse" color="green" />
                  </div>
                  <p className="text-xs text-gray-400 font-medium">Pulse</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-center">
                <Button
                  size="sm"
                  variant="outline"
                  loading={loadingDemo}
                  onClick={handleLoadingDemo}
                >
                  {loadingDemo ? "Memuat..." : "Demo Full-page Loading"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================
          LAYOUT COMPONENTS
      ======================== */}
      <section>
        <SectionDivider
          icon={<FiLayout size={16} />}
          title="Layout Components"
          subtitle="Container dan Footer — komponen struktural halaman"
          tag="2 komponen"
        />

        <Card
          title="Container + Footer"
          subtitle="Container membungkus konten dengan lebar maksimum; Footer memberikan informasi di bawah halaman"
        >
          <Container maxWidth="lg" className="bg-gray-50 rounded-xl py-8">
            <div className="text-center space-y-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Container maxWidth="lg"
              </p>
              <p className="text-sm text-gray-600">
                Konten ini dibungkus oleh komponen <code className="bg-white px-1.5 py-0.5 rounded text-emerald-600 font-mono text-xs border">Container</code> dengan
                max-width preset. Berguna untuk mengontrol lebar konten di halaman-halaman tertentu.
              </p>
            </div>
          </Container>

          <div className="mt-5 rounded-xl overflow-hidden border border-gray-100">
            <Footer variant="full" />
          </div>
          <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
            <Footer variant="minimal" />
          </div>
        </Card>
      </section>

      {/* ========================
          STAT CARDS DEMO
      ======================== */}
      <section>
        <SectionDivider
          icon={<FiTrendingUp size={16} />}
          title="CardStat Component"
          subtitle="Card ringkasan angka dengan ikon, label, dan trend"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <CardStat
            label="Total Produk"
            value={productsData.length}
            trend="+8% bulan ini"
            trendUp
            iconBg="bg-emerald-100"
            icon={<FiPackage size={20} className="text-emerald-600" />}
          />
          <CardStat
            label="Total Pelanggan"
            value="1,284"
            trend="+12% bulan ini"
            trendUp
            iconBg="bg-blue-100"
            icon={<FiUsers size={20} className="text-blue-600" />}
          />
          <CardStat
            label="Order Aktif"
            value="247"
            trend="-3% bulan ini"
            trendUp={false}
            iconBg="bg-amber-100"
            icon={<FiShoppingBag size={20} className="text-amber-600" />}
          />
          <CardStat
            label="Revenue"
            value="Rp 48jt"
            trend="+25% bulan ini"
            trendUp
            iconBg="bg-rose-100"
            icon={<FiTrendingUp size={20} className="text-rose-600" />}
          />
        </div>
      </section>

      {/* ========================
          TOAST NOTIFICATION
      ======================== */}
      {toastVisible && (
        <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-3 fade-in duration-300">
          <Alert variant="success" title="Form berhasil disubmit!">
            Data kamu sudah tersimpan dengan benar.
          </Alert>
        </div>
      )}

      {/* ========================
          FOOTER
      ======================== */}
      <Footer variant="full" />

      {/* ======================================================
          MODALS
      ====================================================== */}

      {/* Form Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedProduct ? `Edit: ${selectedProduct.title}` : "Tambah Item Baru"}
        size="md"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
              Batal
            </Button>
            <Button size="sm" onClick={handleFormSubmit}>
              Simpan Data
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Alert variant="info">
            Ini adalah contoh Form Modal. Isi form di bawah, lalu klik Simpan.
          </Alert>
          <InputField
            label="Nama Produk"
            name="name"
            placeholder="Masukkan nama produk..."
            value={formValues.name}
            onChange={handleFormChange}
            error={formErrors.name}
            required
          />
          <InputField
            label="Email Kontak"
            name="email"
            type="email"
            placeholder="kontak@produk.com"
            value={formValues.email}
            onChange={handleFormChange}
            error={formErrors.email}
          />
          <SelectField
            label="Kategori"
            name="category"
            options={CATEGORY_OPTIONS}
            value={formValues.category}
            onChange={handleFormChange}
            error={formErrors.category}
            required
          />
          <TextArea
            label="Deskripsi"
            name="description"
            placeholder="Ceritakan produk..."
            value={formValues.description}
            onChange={handleFormChange}
            rows={3}
            maxLength={150}
          />
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={confirmModal}
        onClose={() => setConfirmModal(false)}
        title="Konfirmasi Hapus"
        size="sm"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setConfirmModal(false)}>
              Batal
            </Button>
            <Button variant="danger" size="sm" onClick={() => setConfirmModal(false)}>
              Ya, Hapus
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-center py-2">
          <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center mx-auto">
            <FiAlertCircle size={28} className="text-rose-500" />
          </div>
          <h3 className="font-bold text-gray-800">Hapus data ini?</h3>
          <p className="text-sm text-gray-500">
            Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara permanen dari sistem.
          </p>
        </div>
      </Modal>

      {/* Product Detail Modal */}
      <Modal
        isOpen={detailModal}
        onClose={() => setDetailModal(false)}
        title="Detail Produk"
        size="md"
        footer={
          <Button size="sm" onClick={() => setDetailModal(false)}>
            Tutup
          </Button>
        }
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
                📦
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{selectedProduct.title}</h3>
                <p className="text-xs text-gray-400">{selectedProduct.code} · {selectedProduct.brand}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Kategori",  value: selectedProduct.category },
                { label: "Brand",     value: selectedProduct.brand },
                { label: "Harga",     value: `Rp ${Number(selectedProduct.price).toLocaleString("id-ID")}` },
                { label: "Stok",      value: `${selectedProduct.stock} unit` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Full-page Loading Demo */}
      {loadingDemo && (
        <LoadingSpinner
          fullPage
          variant="spin"
          size="lg"
          color="green"
          label="Memuat data..."
        />
      )}
    </div>
  );
}