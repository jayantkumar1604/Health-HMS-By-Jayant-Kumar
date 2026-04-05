package com.hms.appointment.dto;

import com.hms.appointment.entity.Appointment;
import com.hms.appointment.entity.Prescription;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrescriptionDetails {
        private Long id;
        private Long patientId;
        private Long doctorId;
        private String doctorName;
        private Long appointmentId;
        private LocalDate prescriptionDate;
        private String notes;
        private List<MedicineDTO> medicines;

}
