import { useRef, useState } from "react";
import { css } from "@emotion/css";
import {
  HvCodeEditor,
  HvCodeEditorProps,
  hvSqlFormatter,
} from "@hitachivantara/uikit-react-code-editor";
import {
  HvButton,
  HvButtonProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Code } from "@hitachivantara/uikit-react-icons";

const classes = {
  headerRoot: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: `1px solid ${theme.colors.atmo4}`,
    borderBottom: "none",
    background: theme.colors.atmo1,
    padding: theme.spacing("xs", "sm"),
    gap: theme.space.xs,
  }),
};

export const Header = ({
  onFormat,
}: {
  onFormat: HvButtonProps["onClick"];
}) => (
  <div className={classes.headerRoot}>
    <HvTypography variant="label">SQL</HvTypography>
    <Code />
    <div style={{ flex: 1 }} />
    <HvButton variant="primaryGhost" onClick={onFormat}>
      Format
    </HvButton>
  </div>
);

const dbSchema = `
CREATE DATABASE OnlineStore;

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    DateOfBirth DATE,
    Gender CHAR(1) CHECK (Gender IN ('M', 'F')),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL CHECK (Price >= 0),
    StockQuantity INT NOT NULL CHECK (StockQuantity >= 0),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT NOT NULL,
    OrderDate DATE NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL CHECK (TotalAmount >= 0),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    UnitPrice DECIMAL(10, 2) NOT NULL CHECK (UnitPrice >= 0),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
`;

const defaultValue = ``;

export const SqlStory = () => {
  const [editorValue, setEditorValue] = useState(defaultValue);

  const editorRef = useRef<any>(null);

  const handleMount: HvCodeEditorProps["onMount"] = (editor) => {
    editorRef.current = editor;
  };

  const handleFormat = async () => {
    try {
      const content = editorRef.current.getValue();
      const formattedCode = await hvSqlFormatter(content);
      if (formattedCode) editorRef.current.setValue(formattedCode);
    } catch (error) {
      // eslint-disable-next-line no-console
      if (import.meta.env.DEV) console.error(error);
    }
  };

  return (
    <div>
      <Header onFormat={handleFormat} />
      <HvCodeEditor
        height={270}
        language="sql"
        value={editorValue}
        onChange={(content) => setEditorValue(content ?? "")}
        onMount={handleMount}
        schema={dbSchema}
      />
    </div>
  );
};
