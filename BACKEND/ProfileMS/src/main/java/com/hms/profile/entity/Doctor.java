package com.hms.profile.entity;

import com.hms.profile.dto.DoctorDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(unique = true)
    private String email;
    private LocalDate dob;
    private String phone;
    private String address;
    @Column(unique = true)
    private String licenseNo;
    private String Specialization;
    private String department;
    private String totalExp;

    public DoctorDTO toDTO(){
        return new DoctorDTO(this.id,this.name,this.email,this.dob,this.phone,this.address,this.licenseNo,this.Specialization,this.department,this.totalExp);
    }
}

