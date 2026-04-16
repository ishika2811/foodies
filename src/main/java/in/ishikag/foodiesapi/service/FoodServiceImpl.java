package in.ishikag.foodiesapi.service;

import in.ishikag.foodiesapi.entity.FoodEntity;
import in.ishikag.foodiesapi.io.FoodRequest;
import in.ishikag.foodiesapi.io.FoodResponse;
import in.ishikag.foodiesapi.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    // ✅ REAL IMAGE UPLOAD (no dummy)
    @Override
    public String uploadFile(MultipartFile file) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            // create uploads folder
            Path uploadPath = Paths.get("uploads");

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // save file
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            // 👉 IMPORTANT: Render URL
            return "https://foodies-28.onrender.com/uploads/" + fileName;

        } catch (Exception e) {
            throw new RuntimeException("File upload failed", e);
        }
    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {

        FoodEntity newFoodEntity = convertToEntity(request);

        // ✅ upload real image
        String imageUrl = uploadFile(file);
        newFoodEntity.setImageUrl(imageUrl);

        newFoodEntity = foodRepository.save(newFoodEntity);

        return convertToResponse(newFoodEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {
        List<FoodEntity> databaseEntries = foodRepository.findAll();

        return databaseEntries.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFood(String id) {
        FoodEntity existingFood = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found for id: " + id));

        return convertToResponse(existingFood);
    }

    @Override
    public boolean deleteFile(String filename) {
        try {
            Path filePath = Paths.get("uploads").resolve(filename);
            return Files.deleteIfExists(filePath);
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public void deleteFood(String id) {
        FoodResponse response = readFood(id);

        // delete image file
        if (response.getImageUrl() != null) {
            String filename = response.getImageUrl().substring(response.getImageUrl().lastIndexOf("/") + 1);
            deleteFile(filename);
        }

        // delete from DB
        foodRepository.deleteById(response.getId());
    }

    private FoodEntity convertToEntity(FoodRequest request) {
        return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .build();
    }

    private FoodResponse convertToResponse(FoodEntity entity) {
        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }
}
