import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://drotto.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
    // 1. Páginas Estáticas Conhecidas
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
        priority: route === '' ? 1 : (route === '/ortopedista-campinas' || route === '/hernia-de-disco-campinas' || route === '/viscossuplementacao-campinas' || route === '/infiltracao-joelho-campinas') ? 0.95 : 0.8,
    }));

    const extraRoutes = [
        { url: `${BASE_URL}/hernia-de-disco-campinas`, priority: 0.95 },
        { url: `${BASE_URL}/viscossuplementacao-campinas`, priority: 0.95 },
        { url: `${BASE_URL}/infiltracao-joelho-campinas`, priority: 0.95 }
    ].map(item => ({
        url: item.url,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: item.priority
    }));

    // 2. Blog Posts (Dinâmico com Proteção de Erro)
    let blogPosts: MetadataRoute.Sitemap = [];

    try {
        const blogDir = path.join(process.cwd(), 'src', 'app', 'blog');

        if (fs.existsSync(blogDir)) {
            const items = fs.readdirSync(blogDir, { withFileTypes: true });

            blogPosts = items
                .filter(item => item.isDirectory())
                .map(dir => {
                    try {
                        const hasMdx = fs.existsSync(path.join(blogDir, dir.name, 'page.mdx'));
                        const hasTsx = fs.existsSync(path.join(blogDir, dir.name, 'page.tsx'));
                        const hasJs = fs.existsSync(path.join(blogDir, dir.name, 'page.js'));

                        if (hasMdx || hasTsx || hasJs) {
                            return {
                                url: `${BASE_URL}/blog/${dir.name}`,
                                lastModified: new Date(),
                                changeFrequency: 'monthly' as const,
                                priority: 0.7,
                            };
                        }
                    } catch (e) {
                        return null;
                    }
                    return null;
                })
                .filter(Boolean) as MetadataRoute.Sitemap;
        }
    } catch (error) {
        console.error('Erro ao gerar sitemap do blog:', error);
    }

    // 3. App Root Discovery (Dinâmico com Proteção)
    let dynamicPages: MetadataRoute.Sitemap = [];
    try {
        const appDir = path.join(process.cwd(), 'src', 'app');
        if (fs.existsSync(appDir)) {
            const folders = fs.readdirSync(appDir, { withFileTypes: true });

            folders.forEach(dirent => {
                if (dirent.isDirectory()) {
                    const folderName = dirent.name;
                    if (folderName.startsWith('.') || folderName === 'api' || folderName === 'blog') return;

                    const hasPage = fs.existsSync(path.join(appDir, folderName, 'page.tsx')) || fs.existsSync(path.join(appDir, folderName, 'page.js'));
                    if (hasPage && !staticRoutes.includes(`/${folderName}`)) {
                        dynamicPages.push({
                            url: `${BASE_URL}/${folderName}`,
                            lastModified: new Date(),
                            changeFrequency: 'monthly',
                            priority: 0.8,
                        });
                    }
                }
            });
        }
    } catch (e) {
        console.error("Erro no discovery raiz:", e);
    }


    return [...staticSitemap, ...extraRoutes, ...blogPosts, ...dynamicPages];
}
