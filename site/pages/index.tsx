import commerce from '@lib/api/commerce'
import { Layout, SEO } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Section from '@components/ui/Section'
import uploads from '@lib/uploads'
import Gallery from '@components/common/Gallery'
import generateBlurPlaceholder from '@lib/uploads/generateBlurPlaceholder'
import AdaptiveVideoPlayer from '@components/common/AdaptiveVideoPlayer'
import range from 'lodash/range'
import Image from 'next/image'
import TextSection from '@components/ui/Text/TextSection'
import ContactForm from '@components/ui/ContactForm'

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
      <div className="-mt-16">
        <AdaptiveVideoPlayer poster="/main.png" videoSrc="media/main_ibrzrf" />
      </div>
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
      <Section.Heading title="about" />

      <Marquee variant="secondary">
        {range(4).map((idx) => (
          <Image
            key={idx}
            width={300}
            height={600}
            placeholder="blur"
            src={require(`@assets/static/about/${idx + 1}.jpg`)}
            alt={`about-${idx}`}
          />
        ))}
      </Marquee>
      <TextSection>
        <p>
          Neiz.vesten is an international artist and professional tattooist, and
          one of the founders of the neosymbolism subgenre. He connects the past
          and future to the present with the help of new symbols, ancient ways
          of tattooing, neural networks, NFTs, sculptures, and canvases. His
          name in Russian – неизвестен – translates to ‘unknown artist’.
        </p>
        <p>
          Neiz draws inspiration from sounds, colors, emotions, physiology,
          psychology, science, mythology, mysticism, and more to create unique
          symbols that transcend time and place. His work is reminiscent of
          Wassily Kandinsky and Johannesburg Itten, but Neiz gives his own
          alternative application and vision.
        </p>
        <p>
          Neiz has been developing his alternative vision of symbols and their
          creation for more than 10 years. Dubbed the ‘key keeper’, people turn
          to him for unique sacred keys and symbols.
        </p>
        <p>Neiz has collaborated extensively with major brands including:</p>
        <ul className="unordered-list bullet-primary">
          <li>MERCEDES BENZ - Fashion Week</li>
          <li>
            MAYAN WARRIOR - Art and Music Community, Mexico City and Northern
            California (Music festival)
          </li>
          <li>ART WATCH - Mechanical art watch company from New York</li>
          <li>AMPERSOUND - Music audio system</li>
        </ul>
        <p>
          As a tattoo artist, Neiz has taken part in collaborations with INKBOX,
          Miami Tattoos, and more. He is currently sponsored by Balm Tattoo
          (worldwide).
        </p>
        <p className="fst-italic fs-17">
          “I see how the space in which we live speaks to me, and what I do
          comes from the future.”
          <br />
          <span className="fst-normal">- Neiz</span>
        </p>
      </TextSection>
      <Section.Heading title="contact" />
      <section className="wrapper bg-black">
        <div className="container pt-6 pb-10">
          <div className="row">
            <div className="col-xl-12 mx-auto">
              <div className="row gy-10 gx-lg-8 gx-xl-12">
                <div className="col-lg-7">
                  <ContactForm />
                </div>
                <div className="col-lg-5 text-white">
                  <div className="d-flex w-50% flex-row">
                    <div>
                      <h3 className="mb-2 text-white">links</h3>
                      <p className="mb-1">
                        <a
                          className="link-white"
                          href="https://www.instagram.com/neiz.vesten/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          instagram
                        </a>
                      </p>
                      <p className="mb-1">
                        <a
                          className="link-white"
                          href="https://twitter.com/Neizvstn"
                          target="_blank"
                          rel="noreferrer"
                        >
                          twitter
                        </a>
                      </p>
                      <p className="mb-1">
                        <a
                          className="link-white"
                          href="https://www.pinterest.com/Neizvstn"
                          target="_blank"
                          rel="noreferrer"
                        >
                          pinterest
                        </a>
                      </p>
                      <p className="mb-1">
                        <a
                          className="link-white"
                          href="https://foundation.app/@neizvesten"
                          target="_blank"
                          rel="noreferrer"
                        >
                          foundation
                        </a>
                      </p>
                      <p className="mb-1">
                        <a
                          className="link-white"
                          href="https://t.me/neosymbolism"
                          target="_blank"
                          rel="noreferrer"
                        >
                          telegram
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* </Grid> */}
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
