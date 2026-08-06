import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog & Rehberler",
  description:
    "Römork seçimi, römork fiyatları, mobil mutfak ve daha fazlası. Pino Römork'tan pratik rehberler ve sektörel bilgiler.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="subpage">
      <section className="page-hero">
        <div className="wrap">
          <Reveal as="nav" className="crumbs" aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            <span>/</span>
            <span aria-current="page">Blog</span>
          </Reveal>
          <Reveal as="h1" className="page-title">
            Blog &amp; <em>rehberler.</em>
          </Reveal>
          <Reveal as="p" className="page-lead">
            Römork seçiminden fiyatlandırmaya, iş fikirlerinden teknik bilgilere;
            doğru kararı vermenize yardımcı olacak pratik içerikler.
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="blog-grid">
            {blogPosts.map((post, i) => (
              <Reveal
                as="a"
                className="blog-card"
                key={post.slug}
                href={`/blog/${post.slug}`}
                delay={i * 60}
                aria-label={post.title}
              >
                <div className="blog-thumb">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width:760px) 100vw, (max-width:1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="blog-cat">{post.category}</span>
                </div>
                <div className="blog-body">
                  <div className="blog-meta">
                    <span>{post.dateLabel}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="blog-more">Devamını okuyun →</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
