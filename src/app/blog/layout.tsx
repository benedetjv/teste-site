import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Blog - Dr. Otto Beckedorff",
    description: "Artigos e novidades sobre tratamentos da dor, ortopedia e saúde da coluna.",
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
