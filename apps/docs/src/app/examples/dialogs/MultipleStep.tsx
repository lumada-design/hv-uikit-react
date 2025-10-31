import { useEffect, useState } from "react";
import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
  HvInput,
} from "@hitachivantara/uikit-react-core";

type FormData = {
  name: string;
  email: string;
};

type StepProps = {
  data: FormData;
  onChange: (changes: Partial<FormData>) => void;
};

export default function Demo() {
  const [open, setOpen] = useState(false);

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (!open) {
      setStep(0);
      setFormData({ name: "", email: "" });
    }
  }, [open]);

  const steps = [
    {
      title: "Enter your name",
      content: (
        <Step1
          data={formData}
          onChange={(val) => setFormData((d) => ({ ...d, ...val }))}
        />
      ),
    },
    {
      title: "Enter your email",
      content: (
        <Step2
          data={formData}
          onChange={(val) => setFormData((d) => ({ ...d, ...val }))}
        />
      ),
    },
  ];

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);
  const handleSubmit = () => {
    console.log(formData);
    setOpen(false);
  };

  return (
    <>
      <HvDialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <HvDialogTitle>{steps[step].title}</HvDialogTitle>
        <HvDialogContent>{steps[step].content}</HvDialogContent>

        <HvDialogActions>
          <HvButton variant="secondarySubtle" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
          <div className="flex gap-xs">
            {step > 0 && (
              <HvButton variant="secondarySubtle" onClick={handleBack}>
                Previous
              </HvButton>
            )}
            {step < steps.length - 1 ? (
              <HvButton variant="primary" onClick={handleNext}>
                Next
              </HvButton>
            ) : (
              <HvButton variant="primary" onClick={handleSubmit}>
                Confirm
              </HvButton>
            )}
          </div>
        </HvDialogActions>
      </HvDialog>
      <HvButton variant="secondaryGhost" onClick={() => setOpen(true)}>
        Open Multi-Step Dialog
      </HvButton>
    </>
  );
}

const Step1 = ({ data, onChange }: StepProps) => {
  return (
    <HvInput
      label="Name"
      value={data.name}
      onChange={(e) => onChange({ name: e.target.value })}
    />
  );
};

const Step2 = ({ data, onChange }: StepProps) => {
  return (
    <HvInput
      label="Email"
      value={data.email}
      onChange={(e) => onChange({ email: e.target.value })}
    />
  );
};
