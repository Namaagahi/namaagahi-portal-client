"use client";
import Loading from "@/app/features/loading/Loading";
import { PDFViewer } from "@react-pdf/renderer";
import AvailableStructuresPdf from "./AvailableStructuresPdf";
import { FC } from "react";

interface AvailablesReportProp {
  availableStructures: any;
}

const AvailablesReport: FC<AvailablesReportProp> = (availableStructures) => {
  if (!availableStructures) return <Loading />;
  return (
    <>
      <PDFViewer height={900} width={"100%"}>
        <AvailableStructuresPdf structures={availableStructures} />
      </PDFViewer>
    </>
  );
};

export default AvailablesReport;
