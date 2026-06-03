package com.javaweb.api.renttype;

import com.javaweb.model.RentTypeDTO;
import com.javaweb.repository.RentTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rent-types")
public class RentTypeAPI {

    @Autowired
    private RentTypeRepository rentTypeRepository;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public List<RentTypeDTO> getAllRentTypes() {
        return rentTypeRepository.findAll().stream()
                .map(rentType -> new RentTypeDTO(
                        rentType.getId(),
                        rentType.getCode(),
                        rentType.getName()
                ))
                .collect(Collectors.toList());
    }
}