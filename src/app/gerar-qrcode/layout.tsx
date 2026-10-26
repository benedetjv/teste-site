import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Central de QR Codes e Cartões de Visita | Uso Interno',
    robots: {
        index: false,
        follow: false,
    },
};

export default function QrCodeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
