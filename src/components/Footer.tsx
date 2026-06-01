export const Footer = () => {
  return (
    <footer id="contact" className="border-t border-white/10 bg-[#050214]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-semibold text-white">Savitri Dental Hospital &amp; Maxillofacial Centre</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
            66A/2C, Ward No 25, Stanley Road, Prayagraj 211002
          </p>
          <p className="mt-2 text-sm text-white/65">drreemashukla10@gmail.com | 9956967000</p>
        </div>
        <div className="flex flex-col justify-between gap-4 text-sm text-white/60 lg:items-end lg:text-right">
          <p>Luxury medical branding for dental, surgery, and skin aesthetics.</p>
          <p>© 2026 Savitri Dental Hospital &amp; Maxillofacial Centre</p>
        </div>
      </div>
    </footer>
  );
};