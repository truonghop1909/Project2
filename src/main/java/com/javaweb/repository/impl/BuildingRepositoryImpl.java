package com.javaweb.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import com.javaweb.builder.BuildingSearchBuilder;
import com.javaweb.model.BuildingRequestDTO;
import com.javaweb.repository.BuildingRepository;
import com.javaweb.repository.entity.BuildingEntity;
import com.javaweb.repository.entity.DistrictEntity;

@Repository
@Primary
public class BuildingRepositoryImpl implements BuildingRepository{
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<BuildingEntity> findAll(BuildingSearchBuilder buildingSearchBuilder) {
		// TODO Auto-generated method stub
		//JDQL
		String sql = "FROM BuildingEntity b WHERE b.name LIKE '%building%'";
		Query query = entityManager.createQuery(sql,BuildingEntity.class);
		return query.getResultList();
	}

	@Override
	public void DeleteById(long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateBuilding(Integer id, BuildingRequestDTO buildingRequestDTO) {

	    BuildingEntity building = new BuildingEntity();

	    // ===== ID (BẮT BUỘC) =====
	    building.setId(id);

	    // ===== BASIC INFO =====
	    building.setName(buildingRequestDTO.getName());
	    building.setWard(buildingRequestDTO.getWard());
	    building.setStreet(buildingRequestDTO.getStreet());
	    building.setStructure(buildingRequestDTO.getStructure());
	    building.setNumberOfBasement(buildingRequestDTO.getNumberOfBasement());
	    building.setFloorArea(buildingRequestDTO.getFloorArea());
	    building.setDirection(buildingRequestDTO.getDirection());
	    building.setLevel(buildingRequestDTO.getLevel());

	    // ===== RENT & FEES =====
	    building.setRentPrice(buildingRequestDTO.getRentPrice());
	    building.setRentPriceDescription(buildingRequestDTO.getRentPriceDescription());
	    building.setServiceFee(buildingRequestDTO.getServiceFee());
	    building.setCarFee(buildingRequestDTO.getCarFee());
	    building.setMotorFee(buildingRequestDTO.getMotorFee());
	    building.setOvertimeFee(buildingRequestDTO.getOvertimeFee());
	    building.setElectricityFee(buildingRequestDTO.getElectricityFee());
	    building.setWaterFee(buildingRequestDTO.getWaterFee());
	    building.setDeposit(buildingRequestDTO.getDeposit());
	    building.setPayment(buildingRequestDTO.getPayment());
	    building.setRentTime(buildingRequestDTO.getRentTime());
	    building.setDecorationTime(buildingRequestDTO.getDecorationTime());

	    // ===== MANAGER =====
	    building.setManagerName(buildingRequestDTO.getManagerName());
	    building.setManagerPhone(buildingRequestDTO.getManagerPhone());
	    building.setBrokerageFee(buildingRequestDTO.getBrokerageFee());
	    building.setNote(buildingRequestDTO.getNote());

	    // ===== DISTRICT (FK) =====
	    if (buildingRequestDTO.getDistrictId() != null) {
	        DistrictEntity district =
	                entityManager.getReference(
	                        DistrictEntity.class,
	                        buildingRequestDTO.getDistrictId()
	                );
	        building.setDistrict(district);
	    }

	    // ===== MERGE =====
	    entityManager.merge(building);
	}

	@Override
	public void createBuilding(BuildingRequestDTO buildingRequestDTO) {

	    BuildingEntity building = new BuildingEntity();

	    // ===== BASIC INFO =====
	    building.setName(buildingRequestDTO.getName());
	    building.setWard(buildingRequestDTO.getWard());
	    building.setStreet(buildingRequestDTO.getStreet());
	    building.setStructure(buildingRequestDTO.getStructure());
	    building.setNumberOfBasement(buildingRequestDTO.getNumberOfBasement());
	    building.setFloorArea(buildingRequestDTO.getFloorArea());
	    building.setDirection(buildingRequestDTO.getDirection());
	    building.setLevel(buildingRequestDTO.getLevel());

	    // ===== RENT & FEES =====
	    building.setRentPrice(buildingRequestDTO.getRentPrice());
	    building.setRentPriceDescription(buildingRequestDTO.getRentPriceDescription());
	    building.setServiceFee(buildingRequestDTO.getServiceFee());
	    building.setCarFee(buildingRequestDTO.getCarFee());
	    building.setMotorFee(buildingRequestDTO.getMotorFee());
	    building.setOvertimeFee(buildingRequestDTO.getOvertimeFee());
	    building.setElectricityFee(buildingRequestDTO.getElectricityFee());
	    building.setWaterFee(buildingRequestDTO.getWaterFee());
	    building.setDeposit(buildingRequestDTO.getDeposit());
	    building.setPayment(buildingRequestDTO.getPayment());
	    building.setRentTime(buildingRequestDTO.getRentTime());
	    building.setDecorationTime(buildingRequestDTO.getDecorationTime());

	    // ===== MANAGER =====
	    building.setManagerName(buildingRequestDTO.getManagerName());
	    building.setManagerPhone(buildingRequestDTO.getManagerPhone());
	    building.setBrokerageFee(buildingRequestDTO.getBrokerageFee());
	    building.setNote(buildingRequestDTO.getNote());

	    // ===== DISTRICT (FK) =====
	    if (buildingRequestDTO.getDistrictId() != null) {
	        DistrictEntity district =
	                entityManager.getReference(
	                        DistrictEntity.class,
	                        buildingRequestDTO.getDistrictId()
	                );
	        building.setDistrict(district);
	    }

	    // ===== INSERT =====
	    entityManager.persist(building);
	}

	@Override
    public void deleteBuilding(Integer id) {

        entityManager.createNativeQuery(
            "DELETE FROM assignmentbuilding WHERE building_id = :id"
        ).setParameter("id", id).executeUpdate();

        entityManager.createNativeQuery(
            "DELETE FROM rentarea WHERE building_id = :id"
        ).setParameter("id", id).executeUpdate();

        entityManager.createNativeQuery(
            "DELETE FROM buildingrenttype WHERE building_id = :id"
        ).setParameter("id", id).executeUpdate();

        entityManager.createNativeQuery(
            "DELETE FROM building WHERE id = :id"
        ).setParameter("id", id).executeUpdate();
    }

}
