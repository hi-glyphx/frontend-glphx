import React, { useState } from "react";
import Extraction from "@/components/modals/Extraction";

import { Box, Button } from "@mui/material";

export default function Model() {
  const [extractionModal, setExtractionModel] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setExtractionModel(true)}>
        Extraction CheckBox
      </Button>

      <Box className="grid gap-4 grid-cols-3 grid-rows-3">
        <Extraction
          extractionModal={extractionModal}
          setExtractionModel={setExtractionModel}
        />
      </Box>
    </>
  );
}
