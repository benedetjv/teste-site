import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://drotto.com.br';

    // 1. Páginas estáticas principais
    const staticPages = [
        '',
        '/sobre',
        '/localizacao',
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

    // 2. Ler posts do blog dinamicamente
    const blogDir = path.join(process.cwd(), 'src', 'app', 'blog');

    // Lista apenas diretórios dentro de /blog (ignorando arquivos como page.tsx se houver na raiz)
    const blogPosts = fs.readdirSync(blogDir).filter((file) => {
        const filePath = path.join(blogDir, file);
        return fs.statSync(filePath).isDirectory();
    }).map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticPages, ...blogPosts];
}
