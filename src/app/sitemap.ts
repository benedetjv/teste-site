import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://drotto.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
    const appDir = path.join(process.cwd(), 'src', 'app');
    const blogDir = path.join(appDir, 'blog');

    // Lista para armazenar todas as rotas
    let allRoutes: MetadataRoute.Sitemap = [];

    // 1. Adiciona a Home (root page.tsx)
    if (fs.existsSync(path.join(appDir, 'page.tsx'))) {
        allRoutes.push({
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        });
    }

    // 2. Varredura Automática na raiz (src/app/*)
    // Encontra qualquer pasta que tenha page.tsx (ex: /sobre, /contato, /procedimentos)
    if (fs.existsSync(appDir)) {
        const folders = fs.readdirSync(appDir, { withFileTypes: true });

        folders.forEach(dirent => {
            if (dirent.isDirectory()) {
                const folderName = dirent.name;

                // Ignora pastas especiais do Next.js (api, .) ou o próprio blog (tratado separadamente)
                if (folderName.startsWith('.') || folderName === 'api' || folderName === 'blog') return;

                const hasPage = fs.existsSync(path.join(appDir, folderName, 'page.tsx'));

                if (hasPage) {
                    allRoutes.push({
                        url: `${BASE_URL}/${folderName}`,
                        lastModified: new Date(),
                        changeFrequency: 'monthly',
                        priority: 0.8,
                    });
                }
            }
        });
    }

    // 3. Adiciona a raiz do Blog (/blog)
    if (fs.existsSync(path.join(blogDir, 'page.tsx'))) {
        allRoutes.push({
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        });
    }

    // 4. Varredura Automática dos Posts do Blog (src/app/blog/*)
    if (fs.existsSync(blogDir)) {
        const posts = fs.readdirSync(blogDir, { withFileTypes: true });

        posts.forEach(dirent => {
            if (dirent.isDirectory()) {
                const slug = dirent.name;
                const postPath = path.join(blogDir, slug);

                // Aceita .mdx ou .tsx como página de post
                const hasPage = fs.existsSync(path.join(postPath, 'page.mdx')) ||
                    fs.existsSync(path.join(postPath, 'page.tsx'));

                if (hasPage) {
                    allRoutes.push({
                        url: `${BASE_URL}/blog/${slug}`,
                        lastModified: new Date(),
                        changeFrequency: 'monthly',
                        priority: 0.7,
                    });
                }
            }
        });
    }

    return allRoutes;
}
