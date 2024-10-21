import {
  HvButton,
  HvCheckBox,
  HvDropdown,
  HvInput,
} from "@hitachivantara/uikit-react-core";

import { Card } from "./Card";

export const DataConfig = () => {
  const backupOptions = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  return (
    <Card title="Data Management Configuration">
      <div className="grid gap-2">
        <HvInput
          label="Storage Limit (in GB)"
          placeholder="Enter storage limit"
          inputProps={{
            type: "number",
            min: 0,
            step: 10,
            "aria-label": "storage-limit",
          }}
        />
        <HvDropdown
          label="Backup Frequency"
          values={backupOptions}
          placeholder="Select backup frequency"
          aria-label="backup-frequency"
        />
        <HvCheckBox label="Enable Automatic Data Cleanup" />
        <div className="flex justify-end gap-1">
          <HvButton variant="primary" aria-label="save-config-button">
            Save
          </HvButton>
        </div>
      </div>
    </Card>
  );
};