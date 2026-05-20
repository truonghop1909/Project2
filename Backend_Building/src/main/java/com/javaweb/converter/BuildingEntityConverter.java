package com.javaweb.converter;

import org.springframework.stereotype.Component;

import com.javaweb.model.BuildingDetailDTO;
import com.javaweb.repository.entity.BuildingEntity;

@Component
public class BuildingEntityConverter {

    /**
     * Chuyển đổi từ DTO sang Entity (cập nhật entity có sẵn)
     * @param dto BuildingDetailDTO
     * @param entity BuildingEntity (có thể là mới hoặc đã tồn tại)
     */
    public void toEntity(BuildingDetailDTO dto, BuildingEntity entity) {
        // Thông tin cơ bản
        entity.setName(dto.getName());
        entity.setStreet(dto.getStreet());

        // Địa chỉ mới
        if (dto.getProvinceId() != null && !dto.getProvinceId().isEmpty()) {
            entity.setProvinceId(dto.getProvinceId());
            entity.setProvinceName(dto.getProvinceName());
            entity.setWardCode(dto.getWardCode());
            entity.setWardName(dto.getWardName());
        } else if (dto.getProvinceName() != null && !dto.getProvinceName().isEmpty()) {
            entity.setProvinceName(dto.getProvinceName());
            entity.setWardName(dto.getWardName());
        }

        // Full address
        if (dto.getAddress() != null && !dto.getAddress().isEmpty()) {
            entity.setFullAddress(dto.getAddress());
        }

        // Thông tin tòa nhà
        entity.setStructure(dto.getStructure());
        entity.setNumberOfBasement(dto.getNumberOfBasement());
        entity.setFloorArea(dto.getFloorArea());
        entity.setDirection(dto.getDirection());
        entity.setLevel(dto.getLevel());

        // Giá và phí
        entity.setRentPrice(dto.getRentPrice());
        entity.setRentPriceDescription(dto.getRentPriceDescription());
        entity.setServiceFee(dto.getServiceFee());
        entity.setCarFee(dto.getCarFee());
        entity.setMotorFee(dto.getMotorFee());
        entity.setOvertimeFee(dto.getOvertimeFee());
        entity.setElectricityFee(dto.getElectricityFee());
        entity.setWaterFee(dto.getWaterFee());

        // Hợp đồng
        entity.setDeposit(dto.getDeposit());
        entity.setPayment(dto.getPayment());
        entity.setRentTime(dto.getRentTime());
        entity.setDecorationTime(dto.getDecorationTime());

        // Quản lý
        entity.setManagerName(dto.getManagerName());
        entity.setManagerPhone(dto.getManagerPhone());

        // Hoa hồng và ghi chú
        entity.setBrokerageFee(dto.getBrokerageFee());
        entity.setNote(dto.getNote());

        // Hình ảnh
        entity.setGoogleMapLink(dto.getGoogleMapLink());
        
        // Thumbnail (nếu có)
        if (dto.getThumbnail() != null && !dto.getThumbnail().isEmpty()) {
            String thumbnailPath = dto.getThumbnail();
            if (thumbnailPath.startsWith("/uploads/")) {
                thumbnailPath = thumbnailPath.substring(9);
            }
            entity.setThumbnail(thumbnailPath);
        }
    }

    /**
     * Tạo entity mới từ DTO
     * @param dto BuildingDetailDTO
     * @return BuildingEntity
     */
    public BuildingEntity toEntity(BuildingDetailDTO dto) {
        BuildingEntity entity = new BuildingEntity();
        toEntity(dto, entity);
        return entity;
    }
}