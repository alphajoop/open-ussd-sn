import React, { useState, useMemo, useEffect } from "react";
import FilterBar from "@/components/FilterBar";
import UssdTable from "@/components/UssdTable";
import MobileDetail from "@/components/MobileDetail";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import CustomPagination from "@/components/CustomPagination";
import { loadUssdCodes, UssdCode } from "@/data/ussdCodesLoader";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOperateur, setSelectedOperateur] = useState("all");
  const [selectedPays, setSelectedPays] = useState("all");
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ussdCodesData, setUssdCodesData] = useState<UssdCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadUssdCodes();
        setUssdCodesData(data);
      } catch (error) {
        console.error('Error loading USSD codes:', error);
        toast({
          title: t("common.error"),
          description: t("common.loadingError"),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast, t]);

  const filteredData = useMemo(() => {
    return ussdCodesData.filter((item) => {
      const matchesQuery =
        searchQuery === "" ||
        item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.codeUssd.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesOperateur =
        selectedOperateur === "all" || item.operateur === selectedOperateur;

      const matchesPays = selectedPays === "all" || item.pays === selectedPays;

      return matchesQuery && matchesOperateur && matchesPays;
    });
  }, [searchQuery, selectedOperateur, selectedPays, ussdCodesData]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedOperateur, selectedPays]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  const selectedCodeDetails = useMemo(() => {
    if (!selectedCode) return null;
    return filteredData.find((item) => `${item.operateur}-${item.codeUssd}` === selectedCode) || null;
  }, [filteredData, selectedCode]);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: t("common.copied"),
      description: t("common.codeCopied", { code }),
      duration: 2000,
    });
  };

  // Set the selected code when a row is clicked
  const handleRowClick = (code: string) => {
    setSelectedCode(code);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container py-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t("common.title")}</h2>
          <Link to="/infos">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span>{t("common.info")}</span>
            </Button>
          </Link>
        </div>

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedOperateur={selectedOperateur}
          setSelectedOperateur={setSelectedOperateur}
          selectedPays={selectedPays}
          setSelectedPays={setSelectedPays}
        />

        <UssdTable
          data={filteredData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />

        {filteredData.length > 0 && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {selectedCodeDetails && (
          <MobileDetail data={selectedCodeDetails} />
        )}
      </main>

      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container">
          {t("common.copyright", { year: new Date().getFullYear() })}
        </div>
      </footer>
    </div>
  );
};

export default Index;
