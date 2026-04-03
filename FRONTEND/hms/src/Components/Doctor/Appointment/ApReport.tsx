import React from 'react';
import { Fieldset, TextInput, MultiSelect,Textarea } from '@mantine/core'
import {symptoms,tests} from "../../../Data/DropdownData"
const ApReport = () => {
  return (
      <Fieldset className="grid gap-4 grid-cols-2" legend={<span className="text-lg font-medium text-primary-500">Personal Information</span>} radius="md">
          <MultiSelect className="col-span-2" withAsterisk
              label="Symptoms"
              placeholder="Pick symptoms"
              data={symptoms}
          />

          <MultiSelect className="col-span-2" withAsterisk
                       label="Tests"
                       placeholder="Pick tests"
                       data={tests}
          />
          <TextInput label="Diagnosis" placeholder="Enter diagnosis" withAsterisk />
          <TextInput label="Referral" placeholder="Enter referral details" withAsterisk />
          <Textarea className="col-span-2" label="Notes" placeholder="Enter any additional notes" withAsterisk />
      </Fieldset>
  );
};

export default ApReport;

// private Long id;
// private Long patientId;
// private Long doctorId;
// private Long appointmentId;
// private List<String> symptoms;
// private String diagnosis;
// private List<String> tests;
// private String notes;
// private String referral;
// private PrescriptionDTO prescription;
// private LocalDate followUpDate;
// private LocalDateTime createdAt;