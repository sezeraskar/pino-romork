import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { getBlogPosts, getPost } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Yazı bulunamadı" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | Pino Römork`,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 800, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, blogPosts] = await Promise.all([getPost(slug), getBlogPosts()]);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="subpage">
      <article className="section" style={{ paddingBottom: 90 }}>
        <div className="wrap article-wrap">
          <Reveal as="nav" className="crumbs" aria-label="Sayfa yolu">
            <Link href="/">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/blog">Blog</Link>
            <span>/</span>
            <span aria-current="page">{post.category}</span>
          </Reveal>

          <Reveal as="div" className="article-meta">
            <span className="chip">{post.category}</span>
            <span>{post.dateLabel}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </Reveal>

          <Reveal as="h1" className="article-title">
            {post.title}
          </Reveal>

          <Reveal as="p" className="article-excerpt">
            {post.excerpt}
          </Reveal>

          <Reveal className="article-hero">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width:900px) 100vw, 860px"
              style={{ objectFit: "cover" }}
            />
          </Reveal>

          <div className="prose">
            {post.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "ul")
                return (
                  <ul key={i}>
                    {block.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{block.text}</p>;
            })}
          </div>

          <div className="article-cta">
            <div>
              <h3>Size özel bir çözüm mü arıyorsunuz?</h3>
              <p>İhtiyacınıza en uygun römork için ekibimizle görüşün.</p>
            </div>
            <Link href="/iletisim" className="btn">
              Teklif alın
              <ArrowRight />
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section section-alt">
          <div className="wrap">
            <div className="head">
              <Reveal as="h2">İlgili yazılar</Reveal>
            </div>
            <div className="blog-grid">
              {related.map((p, i) => (
                <Reveal
                  as="a"
                  className="blog-card"
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  delay={i * 60}
                  aria-label={p.title}
                >
                  <div className="blog-thumb">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width:1024px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span className="blog-cat">{p.category}</span>
                  </div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span>{p.dateLabel}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                    <span className="blog-more">Devamını okuyun →</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
