import SectionHeading from "@/components/heading";
export default function LegalPage() {
  return (
    <div className="w-full md:w-4/5 xl:w-3/4 mx-auto px-4 py-8">
      {/* Page Title */}
      <SectionHeading showDecoration={false} className="py-10">
        Impressum
      </SectionHeading>

      {/* Content */}
      <div className="space-y-8">
        <div>
          <h2 className="text-primary text-lg sm:text-xl md:text-2xl mb-3">
            Angaben gemäß § 5 TMG:
          </h2>
          <ul className="text-sm sm:text-base space-y-1">
            <li>Sadiq Ajagbe</li>
            <li>Fitness Coach</li>
            <li>Hombrucher Weg 8, 58638 Iserlohn</li>
          </ul>
        </div>

        <div>
          <h2 className="text-primary text-lg sm:text-xl md:text-2xl mb-3">
            Kontakt:
          </h2>
          <p className="text-sm sm:text-base">E-Mail: info@peakmitsadiq.de</p>
        </div>

        <div>
          <h2 className="text-primary text-lg sm:text-xl md:text-2xl mb-3">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
          </h2>
          <ul className="text-sm sm:text-base space-y-1">
            <li>Sadiq Ajagbe</li>
            <li>
              Diese Website wurde erstellt von{" "}
              <a
                href="https://senadat.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary hover:text-primary/80 transition-colors duration-300"
              >
                Senadat
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-primary text-lg sm:text-xl md:text-2xl mb-3">
            Umsatzsteuer-Identifikationsnummer:
          </h2>
          <p className="text-sm sm:text-base">
            Keine Umsatzsteuer-ID vorhanden
          </p>
        </div>

        <div>
          <h2 className="text-primary text-lg sm:text-xl md:text-2xl mb-3">
            Handelsregister:
          </h2>
          <p className="text-sm sm:text-base">Nicht eingetragen</p>
        </div>

        <div>
          <h2 className="text-primary text-lg sm:text-xl md:text-2xl mb-3">
            EU-Streitbeilegung / Online-Streitbeilegungsplattform:
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:
            https://ec.europa.eu/consumers/odr <br />
            Wir sind weder verpflichtet noch bereit, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </div>

        <div>
          <h2 className="text-primary text-lg sm:text-xl md:text-2xl mb-3">
            Haftung für Inhalte:
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
          </p>
        </div>

        <div>
          <h2 className="text-primary text-lg sm:text-xl md:text-2xl mb-3">
            Haftung für Links:
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben.
          </p>
        </div>

        <div>
          <h2 className="text-primary text-lg sm:text-xl md:text-2xl mb-3">
            Urheberrecht:
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Die durch den Betreiber erstellten Inhalte und Werke auf diesen
            Seiten unterliegen dem deutschen Urheberrecht.
          </p>
        </div>
      </div>
    </div>
  );
}
