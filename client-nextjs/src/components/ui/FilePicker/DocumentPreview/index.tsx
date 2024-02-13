import { IconButton, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import './style..css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface DocumentPreviewProps {
  imagePreview: File;
  width?: number;
  height?: number;
  scale?: number;
}

const DocumentPreview: FC<DocumentPreviewProps> = ({ imagePreview, width = 300, height = 300, scale = 1.3, ...rest }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleNextClick = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleBackClick = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className="document-preview-container">
      <Document {...rest} file={imagePreview} onLoadSuccess={onDocumentLoadSuccess}>
        <Page scale={scale} renderAnnotationLayer={false} width={width} pageNumber={pageNumber} />
      </Document>
      <div className="document-navigation-icons">
        <IconButton
          onClick={handleBackClick}
          variant="outline"
          colorScheme="teal"
          aria-label="left-icon"
          icon={<MdKeyboardArrowLeft />}
        />
        <Text>
          {pageNumber} of {numPages}
        </Text>
        <IconButton
          onClick={handleNextClick}
          variant="outline"
          colorScheme="teal"
          aria-label="right-icon"
          icon={<MdKeyboardArrowRight />}
        />
      </div>
    </div>
  );
};

export default DocumentPreview;
