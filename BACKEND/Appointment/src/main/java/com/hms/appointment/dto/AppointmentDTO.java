package com.hms.appointment.dto;

import com.hms.appointment.entity.Appointment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDTO {
    private Long id;
    private Long patientId;
    private Long doctorId;

    private LocalDateTime appointmentTime;
    private Status status;
    private String reason;
    private String notes;

    public Appointment toEntity(){

        Appointment appointment = new Appointment();

        appointment.setId(this.id);
        appointment.setPatientId(this.patientId);
        appointment.setDoctorId(this.doctorId);
        appointment.setAppointmentTime(this.appointmentTime);
        appointment.setStatus(this.status);
        appointment.setReason(this.reason);
        appointment.setNotes(this.notes);

        return appointment;
    }
}
