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
        priority: route === '' ? 1 : 0.8,
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

                        if (hasMdx || hasTsx) {
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
        // Em caso de erro, continua retornando o que conseguiu (staticSitemap)
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

                    const hasPage = fs.existsSync(path.join(appDir, folderName, 'page.tsx'));
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


    return [...staticSitemap, ...blogPosts, ...dynamicPages];
}
