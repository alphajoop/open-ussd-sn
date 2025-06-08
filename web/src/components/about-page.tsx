import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function AboutPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>À propos des codes USDD</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">
          Informations sur l'utilisation et la signification des codes USSD
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="mb-3 text-xl font-semibold">
              Qu'est-ce qu'un code USSD?
            </h2>
            <p className="text-muted-foreground">
              USSD (Unstructured Supplementary Service Data) est un protocole de
              communication utilisé par les téléphones mobiles GSM pour
              communiquer avec les ordinateurs des fournisseurs de services.
              Contrairement aux SMS, les sessions USSD établissent une connexion
              en temps réel pendant une session, permettant un échange
              bidirectionnel de données.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">
              Comment utiliser un code USSD?
            </h2>
            <p className="text-muted-foreground mb-4">
              Pour utiliser un code USSD, composez simplement le code sur votre
              téléphone comme si vous alliez passer un appel. Les codes
              commencent généralement par * ou # et se terminent par #. Après
              avoir composé le code, appuyez sur la touche d'appel, et un menu
              ou une réponse apparaîtra sur votre écran.
            </p>
            <div className="bg-muted rounded-lg p-4">
              <p className="font-mono text-sm">Exemple: *123#</p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">
              Services disponibles via USSD
            </h2>
            <ul className="text-muted-foreground grid grid-cols-1 gap-2 md:grid-cols-2">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Consultation de solde</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Transfert d'argent (services financiers mobiles)</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Achat de forfaits internet, voix ou SMS</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Paiement de factures</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Recharge de crédit</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Souscription à des services</span>
              </li>
            </ul>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
