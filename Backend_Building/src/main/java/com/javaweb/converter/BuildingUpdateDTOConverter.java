package com.javaweb.converter;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.javaweb.model.BuildingUpdateDTO;
import com.javaweb.repository.entity.BuildingEntity;
import com.javaweb.repository.entity.RentAreaEntity;

@Component
public class BuildingUpdateDTOConverter {

    /* ================= ENTITY → DTO (EDIT) ================= */
    public BuildingUpdateDTO toUpdateDTO(BuildingEntity e) {
        BuildingUpdateDTO dto = new BuildingUpdateDTO();
        dto.setName(e.getName());
        dto.setStreet(e.getStreet());
        dto.setWard(e.getWard());
        dto.setDistrictId(e.getDistrictId());
        dto.setStructure(e.getStructure());
        dto.setDirection(e.getDirection());
        dto.setLevel(e.getLevel());
        dto.setNumberOfBasement(e.getNumberOfBasement());
        dto.setFloorArea(e.getFloorArea());
        dto.setRentPrice(e.getRentPrice());
        dto.setRentPriceDescription(e.getRentPriceDescription());
        dto.setServiceFee(e.getServiceFee());
        dto.setCarFee(e.getCarFee());
        dto.setMotorFee(e.getMotorFee());
        dto.setOvertimeFee(e.getOvertimeFee());
        dto.setElectricityFee(e.getElectricityFee());
        dto.setWaterFee(e.getWaterFee());
        dto.setDeposit(e.getDeposit());
        dto.setPayment(e.getPayment());
        dto.setRentTime(e.getRentTime());
        dto.setDecorationTime(e.getDecorationTime());
        dto.setManagerName(e.getManagerName());
        dto.setManagerPhone(e.getManagerPhone());
        dto.setBrokerageFee(e.getBrokerageFee());
        dto.setNote(e.getNote());
        return dto;
    }

    /* ================= DTO → ENTITY (CREATE / UPDATE) ================= */
    public BuildingEntity toEntity(BuildingUpdateDTO dto) {
        BuildingEntity e = new BuildingEntity();

        e.setName(dto.getName());
        e.setStreet(dto.getStreet());
        e.setWard(dto.getWard());
        e.setDistrictId(dto.getDistrictId());

        e.setStructure(dto.getStructure());
        e.setDirection(dto.getDirection());
        e.setLevel(dto.getLevel());
        e.setNumberOfBasement(dto.getNumberOfBasement());
        e.setFloorArea(dto.getFloorArea());

        e.setRentPrice(dto.getRentPrice());
        e.setRentPriceDescription(dto.getRentPriceDescription());
        e.setServiceFee(dto.getServiceFee());
        e.setCarFee(dto.getCarFee());
        e.setMotorFee(dto.getMotorFee());
        e.setOvertimeFee(dto.getOvertimeFee());
        e.setElectricityFee(dto.getElectricityFee());
        e.setWaterFee(dto.getWaterFee());

        e.setDeposit(dto.getDeposit());
        e.setPayment(dto.getPayment());
        e.setRentTime(dto.getRentTime());
        e.setDecorationTime(dto.getDecorationTime());

        e.setManagerName(dto.getManagerName());
        e.setManagerPhone(dto.getManagerPhone());
        e.setBrokerageFee(dto.getBrokerageFee());
        e.setNote(dto.getNote());

        return e;
    }
}
