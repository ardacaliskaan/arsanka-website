export const metadata = {
  title: 'Admin Panel - Arsanka Medya',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#080808]">
      {children}
    </div>
  );
}
