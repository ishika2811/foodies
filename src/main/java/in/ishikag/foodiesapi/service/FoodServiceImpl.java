package in.ishikag.foodiesapi.service;

import in.ishikag.foodiesapi.entity.FoodEntity;
import in.ishikag.foodiesapi.io.FoodRequest;
import in.ishikag.foodiesapi.io.FoodResponse;
import in.ishikag.foodiesapi.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    // ✅ Dummy upload (NO AWS)
    @Override
    public String uploadFile(MultipartFile file) {
        // return dummy image URL
        return "https://dummyimage.com/600x400/000/fff&text=FoodImage";
    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {
        FoodEntity newFoodEntity = convertToEntity(request);

        // use dummy image
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

    // ✅ Dummy delete (NO AWS)
    @Override
    public boolean deleteFile(String filename) {
        return true;
    }

    @Override
    public void deleteFood(String id) {
        FoodResponse response = readFood(id);

        // delete from DB only
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
