import { Meta, StoryObj } from "@storybook/react";
import { HvCodeEditor, HvCodeEditorProps } from "./CodeEditor";
import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";
import {
  HvButton,
  HvTooltip,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import {
  Duplicate,
  PopUp,
  Fullscreen,
} from "@hitachivantara/uikit-react-icons";
import { useState } from "react";
import { Modal } from "@mui/material";

const meta: Meta<typeof HvCodeEditor> = {
  title: "Widgets/Code Editor",
  component: HvCodeEditor,
};
export default meta;

const Header = (props: {
  fileName: string;
  handleOpen: (value: boolean) => void;
}) => {
  const { fileName, handleOpen } = props;

  const styles = {
    headerItemsWrapper: css({
      display: "flex",
      alignItems: "center",
    }),
    codeEditorHeader: css({
      height: 50,
      border: `1px solid ${theme.colors.atmo4}`,
      borderBottom: "none",
      background: theme.colors.atmo1,
      padding: `${theme.spacing("xs")} ${theme.spacing("xs")} ${theme.spacing(
        "xs"
      )} ${theme.spacing("sm")}`,
      display: "flex",
      justifyContent: "space-between",
    }),
    codeEditorFileName: css({
      margin: "5px 0px",
    }),
    codeEditorResetButton: css({
      float: "right",
    }),
    paper: css({
      position: "absolute",
      width: "100%",
      backgroundColor: "#FFF",
      boxShadow:
        "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    }),
    buttonMargin: css({
      marginLeft: theme.spacing("xs"),
    }),
  };

  return (
    <div className={styles.codeEditorHeader}>
      <div className={styles.headerItemsWrapper}>
        <HvTypography
          className={styles.codeEditorFileName}
          component="div"
          variant="label"
        >
          {fileName}
        </HvTypography>
        <HvTooltip title={<HvTypography>Open in new window</HvTypography>}>
          <HvButton
            className={styles.buttonMargin}
            icon
            aria-label="Popup"
            variant="secondaryGhost"
          >
            <a
              href="http://localhost:9001/iframe.html?id=components-code-editor--main"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PopUp />
            </a>
          </HvButton>
        </HvTooltip>
      </div>
      <div className={styles.headerItemsWrapper}>
        <HvTooltip title={<HvTypography>Fullscreen</HvTypography>}>
          <HvButton
            icon
            aria-label="Fullscreen"
            onClick={() => {
              handleOpen(true);
            }}
            variant="secondaryGhost"
          >
            <Fullscreen />
          </HvButton>
        </HvTooltip>
        <HvTooltip title={<HvTypography>Duplicate</HvTypography>}>
          <HvButton
            className={styles.buttonMargin}
            icon
            aria-label="Duplicate"
            variant="secondaryGhost"
          >
            <Duplicate />
          </HvButton>
        </HvTooltip>
      </div>
    </div>
  );
};

const defaultValueYaml =
  'affinity: {}\nconfiguration:\n  helm: defaultTimeoutSeconds=120\nenv:\n  debug: "true"\n  hostname: foo.bar.com\nfullnameOverride: mySolution\nimage:\n  pullPolicy: IfNotPresent\n repository: foo.bar.com:5000/app\n';

const defaultValueJson = `{
    "glossary": {
      "title": "example glossary",
      "GlossDiv": {
        "title": "S",
        "GlossList": {   
          "GlossEntry": {                    
            "ID": "SGML",
            "SortAs": "SGML",
            "GlossTerm": "Standard Generalized Markup Language",
            "Acronym": "SGML",
            "Abbrev": "ISO 8879:1986",
            "GlossDef": {                        
              "para": "A meta-markup language, used to create markup languages such as DocBook.",
              "GlossSeeAlso": ["GML", "XML"]                    
            },
            "GlossSee": "markup"                
          }            
        }        
      }    
    }
  }`;

export const Main: StoryObj<HvCodeEditorProps> = {
  render: () => {
    const getModalStyle = () => {
      return {
        top: `54%`,
        left: `52%`,
        transform: `translate(-52%, -54%)`,
      };
    };

    const [open, setOpen] = useState(false);
    const [editorContent, setEditorContent] = useState(defaultValueJson);
    const [modalStyle] = useState(getModalStyle);

    const handleClose = () => {
      setOpen(false);
    };

    const styles = {
      paper: css({
        position: "absolute",
        width: "100%",
        backgroundColor: "#FFF",
        boxShadow:
          "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
      }),
    };

    const codeEditor = (height: number) => {
      return (
        <HvCodeEditor
          options={{
            dimension: {
              height,
              width: 800,
            },
          }}
          editorProps={{
            language: "json",
          }}
          onChange={(input) => {
            setEditorContent(input);
          }}
          value={editorContent}
        />
      );
    };

    const body = (
      <div style={modalStyle} className={styles.paper}>
        {codeEditor(500)}
      </div>
    );

    return (
      <>
        <Header fileName="some file.json" handleOpen={setOpen} />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        {codeEditor(420)}
      </>
    );
  },
};

export const YamlEditor: StoryObj<HvCodeEditorProps> = {
  parameters: {
    docs: {
      description: {
        story: "Yaml editor.",
      },
    },
  },
  render: () => {
    return (
      <HvCodeEditor
        options={{
          dimension: {
            height: 270,
            width: 800,
          },
        }}
        language="yaml"
        onChange={(input) => console.log(input)}
        value={defaultValueYaml}
      />
    );
  },
};
