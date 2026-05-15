package com.hms.pharmacy.repository;

import com.hms.pharmacy.entity.Medicine;
import com.hms.pharmacy.exception.HmsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface MedicineRepository extends CrudRepository<Medicine, Long> {
    Optional<Medicine> findByNameIgnoreCaseAndDosageIgnoreCase(String name, String dosage);

    Optional<Integer> findStockById(Long id) throws HmsException;
}
