import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ItemProps {
  scale: number;
  onData: (data: number, currentPage: number) => void;
  file?: string;
  size1?: number;
}
const PdfReader: React.FC<ItemProps> = ({ scale, onData, size1 = 400 }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    onData(numPages, currentPage);
  }

  return (
    <>
      <div className="w-full">
        <Document
          file="https://pdfobject.com/pdf/sample.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          className="w-full"
        >
          {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
            <div key={page} className="w-full">
              <Page
                key={page}
                pageNumber={page}
                width={size1 - 100 ?? 800}
                scale={scale ?? 2}
                renderTextLayer={false}
                onScroll={(e) => {}}
              />
            </div>
          ))}
        </Document>
      </div>
    </>
  );
};

export default PdfReader;
