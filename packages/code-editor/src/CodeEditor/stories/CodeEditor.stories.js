/* eslint-disable no-alert */
import React, { useState } from "react";
import { Fullscreen, Duplicate, PopUp } from "@hitachivantara/uikit-react-icons";
import { HvTypography, HvButton, HvTooltip } from "@hitachivantara/uikit-react-core";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import HvCodeEditor from "../CodeEditor";

export default {
  title: "Inputs/Code Editor",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvCodeEditor } from "@hitachivantara/uikit-react-code-editor"',
    maturityStatus: "stable",
    dsVersion: "3.4.0",
  },
  component: HvCodeEditor,
};
const defaultValueYaml =
  'affinity: {}\nconfiguration:\n  helm: defaultTimeoutSeconds=120\nenv:\n  debug: "true"\n  hostname: foo.bar.com\nfullnameOverride: mySolution\nimage:\n  pullPolicy: IfNotPresent\n repository: foo.bar.com:5000/app\n';

const Header = (props) => {
  // eslint-disable-next-line react/prop-types
  const { fileName, handleOpen } = props;
  const useStyles = makeStyles((theme) => ({
    headerItemsWrapper: {
      display: "flex",
      alignItems: "center",
    },
    codeEditorHeader: {
      height: 50,
      border: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,

      borderBottom: "none",
      background: theme.hv.palette.atmosphere.atmo1,
      padding: `${theme.spacing("xs")}px ${theme.spacing("xs")}px ${theme.spacing(
        "xs"
      )}px ${theme.spacing("sm")}px`,
      display: "flex",
      justifyContent: "space-between",
    },
    codeEditorFileName: {
      margin: "5px 0px",
    },
    codeEditorResetButton: {
      float: "right",
    },
    paper: {
      position: "absolute",
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
    },
    buttonMargin: {
      marginLeft: theme.hvSpacing("xs"),
    },
  }));

  const classes = useStyles();

  return (
    <div
      className={clsx(classes.codeEditorHeader, {
        [classes.codeEditorHeaderInvalid]: false,
      })}
    >
      <div className={classes.headerItemsWrapper}>
        <HvTypography
          className={classes.codeEditorFileName}
          component="div"
          variant="highlightText"
        >
          {fileName}
        </HvTypography>
        <HvTooltip title={<HvTypography>Open in new window</HvTypography>}>
          <HvButton className={classes.buttonMargin} icon aria-label="Popup">
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
      <div className={classes.headerItemsWrapper}>
        <HvTooltip title={<HvTypography>Fullscreen</HvTypography>}>
          <HvButton
            icon
            aria-label="Fullscreen"
            onClick={() => {
              handleOpen(true);
            }}
          >
            <Fullscreen />
          </HvButton>
        </HvTooltip>
        <HvTooltip title={<HvTypography>Duplicate</HvTypography>}>
          <HvButton className={classes.buttonMargin} icon aria-label="Duplicate">
            <Duplicate />
          </HvButton>
        </HvTooltip>
      </div>
    </div>
  );
};

export const Main = () => {
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

  const [open, setOpen] = useState(false);

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
    },
  }));

  const classes = useStyles();

  function getModalStyle() {
    return {
      top: `54%`,
      left: `52%`,
      transform: `translate(-52%, -54%)`,
    };
  }

  const [modalStyle] = React.useState(getModalStyle);
  const handleClose = () => {
    setOpen(false);
  };

  const [editorContent, setEditorContent] = useState(defaultValueJson);

  const codeEditor = (height) => {
    return (
      <HvCodeEditor
        options={{
          dimension: {
            height,
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
    <div style={modalStyle} className={classes.paper}>
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
};

Main.story = {
  parameters: {
    eyes: { include: false },
  },
};

export const YamlEditor = () => {
  return (
    <HvCodeEditor
      options={{
        dimension: {
          height: 270,
        },
      }}
      editorProps={{}}
      language="yaml"
      onChange={(input) => console.log(input)}
      value={defaultValueYaml}
    />
  );
};

YamlEditor.parameters = {
  docs: {
    description: {
      story: "Yaml editor",
    },
  },
  eyes: { include: false },
};
