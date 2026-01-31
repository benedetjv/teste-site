import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://drotto.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
    // 1. Páginas Estáticas Conhecidas e Landing Pages
    // Adicionamos aqui para controlar prioridade manual
    const staticRoutes = [
        '',
        '/sobre',
        '/procedimentos',
        '/contato',
        '/localizacao',
        '/blog',
        '/preconsulta',
        '/ortopedista-campinas',
        '/ortopedista-jacutinga'
    ];

    const staticSitemap = staticRoutes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Blog Posts (Dinâmico)
    // Varre src/app/blog para encontrar qualquer pasta que seja um post
    const blogDir = path.join(process.cwd(), 'src', 'app', 'blog');
    let blogPosts: MetadataRoute.Sitemap = [];

    if (fs.existsSync(blogDir)) {
        const items = fs.readdirSync(blogDir, { withFileTypes: true });

        blogPosts = items
            .filter(item => item.isDirectory())
            .map(dir => {
                // Verifica se existe um arquivo de página válido dentro da pasta
                const hasMdx = fs.existsSync(path.join(blogDir, dir.name, 'page.mdx'));
                const hasTsx = fs.existsSync(path.join(blogDir, dir.name, 'page.tsx'));

                if (hasMdx || hasTsx) {
                    return {
                        url: `${BASE_URL}/blog/${dir.name}`,
                        lastModified: new Date(),
                        changeFrequency: 'monthly' as const,
                        priority: 0.7,
                    };
                }
                return null;
            })
            .filter((item): item is MetadataRoute.Sitemap[number] => item !== null);
    }

    return [...staticSitemap, ...blogPosts];
}
