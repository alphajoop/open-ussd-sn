
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UssdData } from "@/types/UssdData";
import { useTranslation } from "react-i18next";

interface MobileDetailProps {
  data: UssdData | null;
}

const MobileDetail: React.FC<MobileDetailProps> = ({ data }) => {
  const { t } = useTranslation();
  
  if (!data) return null;

  return (
    <div className="md:hidden mt-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-mono">{data.codeUssd}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">{t("common.service")}:</div>
            <div className="font-medium">{data.service}</div>
            
            <div className="text-muted-foreground">{t("common.description")}:</div>
            <div>{data.description}</div>
            
            <div className="text-muted-foreground">{t("common.status")}:</div>
            <div>
              <Badge variant={data.statut === "Actif" ? "default" : "destructive"}>
                {data.statut}
              </Badge>
            </div>
            
            <div className="text-muted-foreground">{t("common.lastUpdate")}:</div>
            <div>{data.derniereMiseAJour}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileDetail;
