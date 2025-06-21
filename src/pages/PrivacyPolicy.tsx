
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen gradient-black-burgundy">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-gold hover:text-gold/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tillbaka till startsidan
          </Link>
        </div>

        <Card className="bg-black/50 backdrop-blur-lg border-gold/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gold">Integritetspolicy</CardTitle>
            <p className="text-white/80">Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-white/90">
            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">1. Information vi samlar in</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-white">Kontoinformation:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>E-postadress</li>
                  <li>Användarnamn</li>
                  <li>Profilinformation som du tillhandahåller</li>
                </ul>
                
                <h3 className="text-lg font-medium text-white">Träningsdata:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Träningsdata och framsteg</li>
                  <li>Övningspreferenser</li>
                  <li>Appanvändningsanalys</li>
                  <li>Enhetsinformation</li>
                </ul>
                
                <h3 className="text-lg font-medium text-white">Valfri information:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Framstegsfoton (lagras lokalt)</li>
                  <li>Kroppsmått</li>
                  <li>Träningsmål</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">2. Hur vi använder din information</h2>
              <p className="mb-3">Vi använder insamlad information för att:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Ge personliga träningsrekommendationer</li>
                <li>Spåra dina framsteg inom träning</li>
                <li>Förbättra appens funktionalitet</li>
                <li>Skicka viktiga appuppdateringar</li>
                <li>Tillhandahålla kundsupport</li>
                <li>Visa relevanta annonser för att stödja appen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">3. Datadelning</h2>
              <p className="mb-3">Vi säljer, handlar eller delar INTE din personliga information med tredje parter förutom:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>När det krävs enligt lag</li>
                <li>För att skydda våra rättigheter och säkerhet</li>
                <li>Med ditt uttryckliga samtycke</li>
                <li>Med annonspartners för att visa relevanta annonser (anonymiserad data)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">4. Datasäkerhet</h2>
              <p className="mb-3">Vi implementerar lämpliga säkerhetsåtgärder för att skydda din personliga information:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Krypterad dataöverföring</li>
                <li>Säkra servrar</li>
                <li>Regelbundna säkerhetsrevisioner</li>
                <li>Begränsade åtkomstkontroller</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">5. Dina rättigheter</h2>
              <p className="mb-3">Du har rätt att:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Få tillgång till dina personuppgifter</li>
                <li>Korrigera felaktig information</li>
                <li>Radera ditt konto och data</li>
                <li>Exportera dina data</li>
                <li>Välja bort kommunikation</li>
                <li>Kontrollera annonsinställningar</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">6. Databevarande</h2>
              <p className="mb-3">Vi behåller dina data:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Kontodata: Tills kontot raderas</li>
                <li>Användningsdata: Maximalt 2 år</li>
                <li>Analysdata: Anonymiseras efter 1 år</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">7. Annonser</h2>
              <p className="mb-3">Calibre använder annonser för att hålla appen gratis. Vi arbetar med betrodda annonspartners som Google AdMob för att visa relevanta annonser. Annonspartners kan använda cookies och liknande teknologier för att:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Visa personaliserade annonser baserat på dina intressen</li>
                <li>Mäta annonseffektivitet</li>
                <li>Förbättra annonsupplevelsen</li>
              </ul>
              <p className="mt-3">Du kan justera dina annonsinställningar i enhetens inställningar eller genom att kontakta oss.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">8. Barns integritet</h2>
              <p>Calibre är inte avsett för barn under 13 år. Vi samlar inte medvetet in information från barn under 13 år.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">9. Ändringar av integritetspolicyn</h2>
              <p>Vi kan uppdatera denna policy. Användare kommer att meddelas via appnotifiering och e-post.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gold mb-3">10. Kontaktinformation</h2>
              <p className="mb-3">För integritetsfrågor, kontakta oss på:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>E-post: privacy@calibre-app.com</li>
                <li>Adress: [Din företagsadress]</li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
