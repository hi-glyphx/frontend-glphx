import Table from "@/components/tables/Table";
import TableHeader from "./TableHeader";
import CtxProvider from "@/components/Common/Context";
import { TableColumn } from "@/shared/config/types";
import { useEffect, useState, useRef } from "react";
import React from "react";
import Toaster from "@/components/Common/Toaster";

// Mock classification data for demo purposes
const mockClassificationItems = [
  {
    batch_id: "BATCH-001",
    status: "In Progress",
    verifier: "John Doe",
    case: "Case #12345",
    document: "Contract Agreement",
    expires: "45",
    created: "2023-08-01"
  },
  {
    batch_id: "BATCH-002",
    status: "Pending",
    verifier: "Jane Smith",
    case: "Case #98765",
    document: "Financial Statement",
    expires: "30",
    created: "2023-08-02"
  },
  {
    batch_id: "BATCH-003",
    status: "Not Started",
    verifier: "Michael Brown",
    case: "Case #54321",
    document: "Legal Document",
    expires: "60",
    created: "2023-08-03"
  },
  {
    batch_id: "BATCH-004",
    status: "In Progress",
    verifier: "Susan Johnson",
    case: "Case #67890",
    document: "Medical Records",
    expires: "15",
    created: "2023-08-04"
  },
  {
    batch_id: "BATCH-005",
    status: "Completed",
    verifier: "Robert Wilson",
    case: "Case #13579",
    document: "Insurance Claim",
    expires: "0",
    created: "2023-08-05"
  }
];

const mockClassificationData = {
  items: mockClassificationItems,
  meta: {
    total_count: 156,
    total_batches_pending: 42,
    total_batches_ready: 78,
    page: 1,
    pages: 32,
    per_page: 5
  }
};

// Define interface for props
interface ClassificationTableProps {
  mockData?: typeof mockClassificationData;
}

const ClassificationTable = ({ mockData = mockClassificationData }: ClassificationTableProps) => {
  // Use state to manage data
  const [tableData, setTableData] = useState(mockData);
  // Keep track of current page to avoid unnecessary toasts
  const currentPageRef = useRef(1);

  const columns: TableColumn[] = [
    {
      Header: "Batch ID",
      accessor: "batch_id",
      sort: true,
    },
    {
      Header: "Status",
      accessor: "status",
      sort: true,
    },
    {
      Header: "Verifier",
      accessor: "verifier",
    },
    {
      Header: "Case",
      accessor: "case",
      sort: true,
    },
    {
      Header: "Document Name",
      accessor: "document",
      sort: true,
    },
    {
      Header: "Expires In(min)",
      accessor: "expires",
    },
  ];

  // Handle table pagination for demo mode
  const handleTableAction = (queryString: string) => {
    // Parse page number from query string
    const pageMatch = queryString.match(/page=(\d+)/);
    
    if (pageMatch && pageMatch[1]) {
      const page = parseInt(pageMatch[1]);
      
      // Only process if the page is different from the current one
      if (page !== currentPageRef.current) {
        // Update current page ref
        currentPageRef.current = page;
        
        // Simulate data change for different pages
        const newData = {...mockData};
        newData.meta.page = page;
        
        // Create different items for different pages
        newData.items = mockClassificationItems.map(item => ({
          ...item,
          batch_id: `BATCH-${page}${item.batch_id.slice(-3)}`,
        }));
        
        // Update state with "new" data
        setTableData(newData);
        
        // Only show toast when page actually changes
        Toaster({ customMessage: `Demo: Navigated to page ${page}` });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <CtxProvider>
          <TableHeader
            data={tableData.items || []}
            tableHeader={columns}
            isDemoMode={true}
          />
          {tableData?.items && (
            <Table
              columns={columns}
              data={tableData.items}
              isCheckbox={true}
              pagination={true}
              dispatchFunction={handleTableAction}
              dataPage={tableData.meta}
            />
          )}
        </CtxProvider>
      </div>
    </>
  );
};

export default ClassificationTable;
