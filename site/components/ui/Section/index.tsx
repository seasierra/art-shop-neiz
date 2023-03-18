const Showcase: React.FC<{
  title: string
  children: React.ReactNode
}> = ({ title, children }) => {
  return (
    <section className="wrapper bg-black text-white">
      <div className="row" id="offline">
        <div className="col-12 text-center">
          <h3 className="display-4 mb-2">{title}</h3>
        </div>
      </div>
      {children}
    </section>
  )
}

const Heading: React.FC<{ title: string }> = ({ title }) => (
  <div className="container pt-10 pt-md-14 bg-black">
    <div className="row">
      <div className="col-12">
        <h2 className="display-1 mb-3">{title}</h2>
      </div>
    </div>
  </div>
)

export default {
  Showcase,
  Heading,
}
