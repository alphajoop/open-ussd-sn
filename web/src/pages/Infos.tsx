
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";

const Infos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-8 flex-1">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>À propos des codes USSD</CardTitle>
            <CardDescription>
              Informations sur l'utilisation et la signification des codes USSD
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-semibold">Qu'est-ce qu'un code USSD?</h3>
            <p>
              USSD (Unstructured Supplementary Service Data) est un protocole de communication 
              utilisé par les téléphones mobiles GSM pour communiquer avec les ordinateurs des 
              fournisseurs de services. Contrairement aux SMS, les sessions USSD établissent 
              une connexion en temps réel pendant une session, permettant un échange bidirectionnel 
              de données.
            </p>
            
            <Separator />
            
            <h3 className="text-lg font-semibold">Comment utiliser un code USSD?</h3>
            <p>
              Pour utiliser un code USSD, composez simplement le code sur votre téléphone comme 
              si vous alliez passer un appel. Les codes commencent généralement par * ou # 
              et se terminent par #. Après avoir composé le code, appuyez sur la touche d'appel,
              et un menu ou une réponse apparaîtra sur votre écran.
            </p>
            
            <Separator />
            
            <h3 className="text-lg font-semibold">Services disponibles via USSD</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Consultation de solde</li>
              <li>Transfert d'argent (services financiers mobiles)</li>
              <li>Achat de forfaits internet, voix ou SMS</li>
              <li>Paiement de factures</li>
              <li>Recharge de crédit</li>
              <li>Souscription à des services</li>
            </ul>
            
            <Separator />
            
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour: 11 Mai 2025
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Infos;
