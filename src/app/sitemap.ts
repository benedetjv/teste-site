import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://drotto.com.br';

    // Páginas estáticas
    const staticPages = [
        '',
        '/sobre',
        '/procedimentos',
        '/contato',
        '/blog',
        '/ortopedista-campinas',
        '/ortopedista-jacutinga',
        '/preconsulta',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return [...staticPages];
}
