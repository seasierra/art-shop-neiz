import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Section from '@components/ui/Section'
import uploads from '@lib/uploads'
import Gallery from '@components/common/Gallery'
import generateBlurPlaceholder from '@lib/uploads/generateBlurPlaceholder'
import AdaptiveVideoPlayer from '@components/common/AdaptiveVideoPlayer'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  const assets = uploads.showcase.flatMap(({ cases }) =>
    cases.flatMap(({ slides }) => slides.map(([assetName]) => assetName))
  )

  const blurs = assets.map(async (assetName) => ({
    assetName,
    // @ts-ignore
    blurDataUrl: await generateBlurPlaceholder({
      public_id: assetName,
      format: 'jpg',
    }),
  }))

  const obj = (await Promise.all(blurs)).reduce(
    (acc, { assetName, blurDataUrl }) =>
      Object.assign(acc, { [assetName]: blurDataUrl }),
    {}
  )

  const showcases = uploads.showcase.map(({ category, cases }) => ({
    category,
    cases: cases.map(({ case: caseTitle, slides }) => ({
      caseTitle,
      slides: slides.map(([assetName, [width, height]]) => ({
        assetName,
        size: [width, height],
        alt: `${caseTitle}_${assetName}`,
        // @ts-ignore
        blurDataUrl: obj[assetName],
      })),
    })),
  }))

  return {
    props: {
      products,
      categories,
      brands,
      pages,
      showcases,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
  showcases,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <AdaptiveVideoPlayer videoSrc="media/main_ibrzrf" />
      {/* <Grid variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              alt: product.name,
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
              priority: true,
            }}
          />
        ))}
      </Grid> */}
      <Section.Heading title="works" />
      {showcases.map(({ category, cases }) => (
        <Section.Showcase key={category} title={category}>
          {cases.map(({ caseTitle, slides }) => (
            <Gallery
              key={caseTitle}
              title={caseTitle}
              slides={slides}
              category={category}
            />
          ))}
        </Section.Showcase>
      ))}
      <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      <Hero
        headline=" Dessert dragée halvah croissant."
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
      />
      <Grid layout="B" variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              alt: product.name,
              width: i === 1 ? 1080 : 540,
              height: i === 1 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  )
}

Home.Layout = Layout
